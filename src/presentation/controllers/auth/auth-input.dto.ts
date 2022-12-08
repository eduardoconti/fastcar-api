import { IsString } from "class-validator";

export class AuthControllerInput {
  @IsString()
  login!: string;

  @IsString()
  password!: string;
}