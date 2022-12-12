import { ArgumentInvalidException, BaseException } from "../exceptions";

export class Result<T = any> {
   public isSuccess: boolean;

   public isFailure: boolean;

   public error?: BaseException;

   private _value?: T;

   private constructor(isSuccess: boolean, error?: BaseException, value?: T) {
      if (isSuccess && error) {
         throw new ArgumentInvalidException(`A result cannot be 
        successful and contain an error`);
      }
      if (!isSuccess && !error) {
         throw new ArgumentInvalidException(`A failing result 
        needs to contain an error message`);
      }

      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      this.error = error;
      this._value = value;

      Object.freeze(this);
   }

   public getValue(): T | undefined {
      if (!this.isSuccess) {
         throw new ArgumentInvalidException(
            "Cant retrieve the value from a failed result.",
         );
      }

      return this._value;
   }

   public static ok<U>(value?: U): Result<U> {
      return new Result<U>(true, undefined, value);
   }

   public static fail<U>(error: BaseException): Result<U> {
      return new Result<U>(false, error);
   }

   public static combine(results: Result<any>[]): Result<any> {
      for (const result of results) {
         if (result.isFailure) return result;
      }
      return Result.ok<any>();
   }
}
