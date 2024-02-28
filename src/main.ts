import { ValidateInstance } from "./validation/validators/validate-instance";
import { Required } from "./validation/validators/required";
import { MinLength } from "./validation/validators/min-length";
import { GreaterThanZero } from "./validation/validators/greater-than-zero";
import { EmailFormat } from "./validation/validators/email-format";
import { Validatable } from "./validation/factory";

@ValidateInstance
class Person {
	@Required
	@MinLength(4)
	name: string;

	@GreaterThanZero
	age: number;

	@EmailFormat
	email: string;

	constructor(name: string, age: number, email: string) {
		this.name = name;
		this.age = age;
		this.email = email;
	}
}

const { instance, status } = Validatable.create(
	Person,
	"John Doe",
	35,
	"john.doe@xyz.com"
);

console.log(instance, status);
