import { InvalidRequestBodyException } from "@/app/exceptions";
import { Result } from "@/domain/contracts";
import { BaseException } from "@/domain/exceptions";
import { HandleControllerException } from "@/infra/exceptions";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Http, IMiddleware } from "../interfaces";

export class ValidateBodyMiddleware implements IMiddleware {
  constructor(private readonly type: any) {}
  async execute(req: Http.Request, res: Http.Response): Promise<Result> {
    try {
      const dtoObj = plainToInstance(this.type, req.body);
      await validate(dtoObj).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints)
            )
            .join(", ");
          throw new InvalidRequestBodyException(dtoErrors, dtoErrors);
        }
      });

      Object.assign(req, {
        body: dtoObj,
      });
    } catch (error: any) {
      if (error instanceof BaseException) {
        return Result.fail(error);
      }

      return Result.fail(new HandleControllerException(error));
    }

    return Result.ok();
  }
}
