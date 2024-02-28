import { ValidationFactory } from "../factory";
import { ValidationType } from "../type";

export const GreaterThanZero = (() =>
	ValidationFactory(({ propertyValue }: any) => <number>propertyValue > 0, {
		type: ValidationType.GreaterThanZero,
	}))();
