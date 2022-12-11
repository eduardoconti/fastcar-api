import {
   IsString,
   registerDecorator,
   ValidationArguments,
   ValidationOptions,
} from "class-validator";

export class CreateUserControllerInput {
   @IsString()
   public name!: string;

   @IsString()
   public login!: string;

   @IsString()
   public password!: string;

   @IsString()
   @MatchPassword()
   public confirmPassword!: string;
}

export function MatchPassword(validationOptions?: ValidationOptions) {
   return function (object: any, propertyName: string) {
      registerDecorator({
         name: "MatchPassword",
         target: object.constructor,
         propertyName,
         constraints: ["password"],
         options: { ...validationOptions, message: "As senhas não coincidem" },
         validator: {
            validate(value: any, args: ValidationArguments) {
               const [relatedPropertyName] = args.constraints;
               const relatedValue = (args.object as any)[relatedPropertyName];
               return (
                  typeof value === "string" &&
            typeof relatedValue === "string" &&
            relatedValue === value
               ); // you can return a Promise<boolean> here as well, if you want to make async validation
            },
         },
      });
   };
}
