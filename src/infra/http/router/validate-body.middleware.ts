import { InvalidRequestBodyException } from "@/app/exceptions";
import { Result } from "@/domain/contracts";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Http, IMiddleware } from "../interfaces";
export class ValidateBodyMiddleware implements IMiddleware {
  constructor(private readonly type: any) {}
  async execute(req: Http.Request, res: Http.Response): Promise<Result> {
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

    return Result.ok();
  }
}
