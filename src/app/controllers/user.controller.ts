import { IController, IHttpRequest } from "@/domain/interfaces";
import { ICreateUser } from "@/domain/use-cases/user";

export class UserController implements IController {

  constructor(private readonly createUser: ICreateUser ){
  }
  async handle(request: IHttpRequest) {
    const { method, path, data} = request
    if(path === '/user' && method === 'POST'){
      return await this.createUser.create(data)
    }
    return Promise.resolve('')
  }
}