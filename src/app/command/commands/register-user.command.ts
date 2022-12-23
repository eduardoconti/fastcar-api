import { Command } from "@domain/contracts/command";

export class RegisterUserCommand extends Command {
   public name: string;
   public login: string;
   public password: string;

   constructor(
      name: string,
      login: string,
      password: string,
      guid?: string
   ) {
      super(guid);
      this.name = name;
      this.login = login;
      this.password = password;
   }
}