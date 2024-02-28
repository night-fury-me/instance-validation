import { ValidationArgument } from "./argument";
import { ValidationStatus } from "./validators/validate-instance";

type ValidatorConfig = {
	[property: string]: {
		[validatableProperties: string]: [Function, any][];
	};
};

export const ValidationRegistry: ValidatorConfig = {};

export function ValidationFactory(
	validator: Function,
	args?: ValidationArgument
) {
	return function (target: any, propName: string) {
		const className = target.constructor.name;
		ValidationRegistry[className] = ValidationRegistry[className] ?? {};
		ValidationRegistry[className][propName] = [
			...(ValidationRegistry[className][propName] ?? []),
			[validator, { ...args, propertyName: propName }],
		];
	};
}

export class Validatable {
	static create<T>(
		cls: { new (...args: any[]): T },
		...args: any[]
	): { instance: T; status: ValidationStatus } {
		return new cls(...args) as unknown as {
			instance: T;
			status: ValidationStatus;
		};
	}
}
