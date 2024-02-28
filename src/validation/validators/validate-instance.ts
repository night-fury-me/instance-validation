import { ValidationArgument } from "../argument";
import { ValidationRegistry } from "../factory";
import { GetErrorMessage } from "../error-message";

function _executeSingleValidation(
	target: any,
	validator: Function,
	args: ValidationArgument
): [boolean, string | undefined] {
	const { type, errorMessage, propertyName } = args as ValidationArgument;

	const isValid: boolean = validator({
		propertyValue: target[propertyName],
	});

	if (isValid) return [isValid, undefined];

	const _errorMessage = GetErrorMessage({
		type,
		errorMessage,
		propertyName,
	});

	return [isValid, _errorMessage];
}

function _executeAggregatedValidation(
	target: any,
	validators: [Function, any][]
): [boolean, Array<string>] {
	const aggregatedValidationState = validators.reduce<[boolean, Array<string>]>(
		(
			[prevValidationStatus, prevErrorMessages],
			[validator, args]
		): [boolean, Array<string>] => {
			const [currValidationStatus, currErrorMessage] = _executeSingleValidation(
				target,
				validator,
				args
			);

			const filteredErrorMessages: Array<string> = (
				currErrorMessage == undefined
					? [...prevErrorMessages]
					: [...prevErrorMessages, currErrorMessage]
			) as Array<string>;

			const isValid = prevValidationStatus && currValidationStatus;
			return [isValid, filteredErrorMessages];
		},
		[true, Array<string>()]
	);

	return aggregatedValidationState;
}

export interface ValidationStatus {
	IsValid: boolean;
	ErrorMessages: Array<string>;
}

export function ValidateInstance<
	T extends {
		new (...args: any[]): {
			[key: string]: any;
		};
	}
>(target: T) {
	return class extends target {
		constructor(...args: any[]) {
			super(...args);
			const registry = Object.values(ValidationRegistry[target.name]);
			const [IsValid, ErrorMessages] = registry.reduce<
				[boolean, Array<string>]
			>(
				([prevValidationStatus, prevErrorMessages], propValidators) => {
					const [currValidationStatus, currErrorMesssages] =
						_executeAggregatedValidation(this, propValidators);
					const isValid = prevValidationStatus && currValidationStatus;
					let aggreegatedErrorMessage = [
						...prevErrorMessages,
						...currErrorMesssages,
					];

					return [isValid, aggreegatedErrorMessage];
				},
				[true, Array<string>()]
			);

			const status = { IsValid, ErrorMessages };
			return {
				instance: this,
				status,
			};
		}
	};
}
