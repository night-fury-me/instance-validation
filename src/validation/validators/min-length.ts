import { ValidationFactory } from "../factory";
import { ValidationType } from "../type";

export const MinLength = (minLength: number) =>
	ValidationFactory(
		({ propertyValue }: any) =>
			(<{ length: number }>propertyValue).length >= minLength,
		{
			type: ValidationType.MinLength,
		}
	);
