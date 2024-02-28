import { ValidationFactory } from "../factory";

export const EmailFormat = (() =>
	ValidationFactory(
		({ propertyValue }: any) => {
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(propertyValue as string);
		},
		{
			type: "EmailFormat",
			errorMessage: "Its not a valid email address.",
		}
	))();
