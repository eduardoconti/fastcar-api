import { Result } from "../contracts";

export interface IUseCase<IRequest, IResponse> {
   execute(request?: IRequest): Promise<Result<IResponse>> | Result<IResponse>;
}
