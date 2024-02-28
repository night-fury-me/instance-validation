import { ValidationFactory } from "../factory";
import { ValidationType } from "../type";

export const Required = (() =>
	ValidationFactory(({ propertyValue }: any) => !!propertyValue, {
		type: ValidationType.Required,
	}))();
