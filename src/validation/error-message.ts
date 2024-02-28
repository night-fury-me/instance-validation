import { ValidationType } from "./type";
import { ValidationArgument } from "./argument";

const ValidationErrorMessages = new Map<ValidationType | string, Function>([
	[
		ValidationType.Required,
		({ propertyName }: ValidationArgument) =>
			`Property[${propertyName}] field is required.`,
	],
	[
		ValidationType.MinLength,
		({ propertyName, minLength }: ValidationArgument) => {
			console.log(`PropertyName: ${propertyName}  || minLength: ${minLength}`);

			return `Property[${propertyName}] requires a minimum length of ${minLength}.`;
		},
	],
	[
		ValidationType.GreaterThanZero,
		({ propertyName }: ValidationArgument) =>
			`Property[${propertyName}] needs to have a positive value.`,
	],
	[
		ValidationType.Custom,
		({ propertyName }: ValidationArgument) =>
			`Property[${propertyName}] does not adhere to validation criteria.`,
	],
]);

export function GetErrorMessage({
	type,
	errorMessage,
	propertyName,
}: ValidationArgument): string {
	if (type in ValidationType) {
		return (
			ValidationErrorMessages.get(type)?.(propertyName) ??
			ValidationErrorMessages.get(ValidationType.Custom)?.(propertyName)
		);
	}
	return `Property[${propertyName}] ${errorMessage}`;
}
