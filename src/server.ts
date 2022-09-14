import './app/config/module-alias'
import { User } from "@/domain/entities";
import { IRepository } from "@/domain/interfaces";
import { UserModel } from "@/infra/models";
import { Repository } from "@/infra/orm/adapters/repository.adapter";
import * as http from "http"
import { UserController } from "./app/controllers";
import { CreateUser } from "./app/use-cases/user";
import { UserRepository } from "./app/use-cases/user/user-repository";
import { Uuid } from "./app/use-cases/uuid/uuid";
import { BaseError } from './domain/entities/error.entity';
const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
  //set the request route

  const controller = new UserController(
    new CreateUser(
      new Uuid(),
      new UserRepository(
        new Repository().adapt(typeof User) as IRepository<UserModel>
      )
    )
  )
  const size = parseInt(req.headers['content-length'] ?? '0', 10)
  const buffer = Buffer.allocUnsafe(size)
  var requestBody;
  var pos = 0
  req.on('data', (chunk) => {
    const offset = pos + chunk.length
    if (offset > size) {
      //reject(413, 'Too Large', res) 
      return
    }
    chunk.copy(buffer, pos)
    pos = offset
  }).on('end', async () => {

    requestBody = JSON.parse(buffer.toString())
    try {
      const result = await controller.handle({
        path: req.url as string,
        method: req.method as string,
        data: requestBody
      })
      console.log(result)
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    } catch (error: any) {
      res.writeHead(500, { "Content-Type": "application/problem+json" });
      if (error instanceof BaseError) {
        res.end(JSON.stringify(error))
      } else {
        res.end(JSON.stringify(new BaseError(500, '', error?.message)));
      }
    }

  }).on('error', (e) => {
    console.log('aqui', e)
  })

});

server.listen(3006, () => {
  console.log(`server started on port: ${3006}`);
});