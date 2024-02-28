# Usage Guide for Instance Validation Library

This guide provides detailed instructions and examples on how to use the Instance Validation Library to enforce validation rules on class instances in TypeScript. By leveraging decorators, you can easily specify requirements such as field presence, minimum lengths, numerical constraints, and email format validations.

## Getting Started

First, ensure you import the necessary validators and the class factory from the library:

```typescript
import { ValidateInstance, Required, MinLength, GreaterThanZero, EmailFormat } from "./validation/validators";
import { Validatable } from "./validation/factory";
```

## Defining Your Class

Decorate your class properties with validation rules. Below is an example of a `Person` class with various validations:

```typescript
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
```

- `@Required`: Ensures the field is not empty.
- `@MinLength(4)`: Validates that the string is at least 4 characters long.
- `@GreaterThanZero`: Checks that the number is greater than zero.
- `@EmailFormat`: Ensures the string is in a valid email format.

## Validating an Instance

To create and validate an instance of your class, use the `Validatable.create` method:

```typescript
const { instance, status } = Validatable.create(Person, "John Doe", 35, "john.doe@xyz.com");

console.log(instance, status);
```

This method attempts to create an instance of `Person` with the provided arguments and applies all specified validations. It returns an object containing the instance (if validation succeeds) and the validation status.

- `instance`: The created instance of the class or `undefined` if validation fails.
- `status`: An object detailing the validation results, including any errors.


## Creating Custom Validators with the Instance Validation Library

The Instance Validation Library not only offers a set of built-in validators but also allows users to create their own custom validators. This flexibility enables developers to define validation logic that fits their specific needs. Below is a guide on how to create and use custom validators within your TypeScript projects.

### Custom Validator Example: EmailFormat

To illustrate how to create a custom validator, we'll go through the process of defining an `EmailFormat` validator. This validator checks if a given string is a valid email address.

### Step 1: Define the Custom Validator

First, you need to import the `ValidationFactory` from the library and use it to create your custom validator. The `ValidationFactory` function takes two arguments: a validation function and an object containing the validator's type and an error message.

```typescript
import { ValidationFactory } from "../factory";

export const EmailFormat = (() =>
    ValidationFactory(
        ({ propertyValue }: any) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(propertyValue as string);
        },
        {
            type: "EmailFormat",
            errorMessage: "It's not a valid email address.",
        }
    ))();
```

In this example, the validation function checks if `propertyValue` matches the specified regular expression pattern for email addresses. If the value is a valid email, the function returns `true`; otherwise, it returns `false`.

### Step 2: Use the Custom Validator in Your Class

After defining the custom validator, you can use it in the same way as the built-in validators by applying it as a decorator to class properties.

```typescript
import { ValidateInstance } from "./validation/validators/validate-instance";
import { EmailFormat } from "./validation/validators/email-format"; // Assuming the custom validator is exported here

@ValidateInstance
class User {
    @EmailFormat
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}
```

## Conclusion

The Instance Validation Library offers a declarative and intuitive approach to enforcing validation rules on class instances. By following the examples provided, you can integrate robust validation logic into your TypeScript applications with minimal effort.
