export namespace ListUser {
   export type Input = {
      id?: string;
      name?: string;
      login?: string;
   };
   export type Output = {
      id: string;
      name: string;
      login: string;
   };
}
