import './app/config/module-alias'
import * as http from "http"
import { UserControllerFactory } from './app/factories/controllers'
import { Router } from './external/router/router'
import { HttpRequest, HttpResponse } from './app/controllers'

const server = http.createServer(async (req: HttpRequest, res: HttpResponse) => {

  const controller = UserControllerFactory.build()

  const routerManager = new Router()
  routerManager.post('/user', controller)

  await routerManager.execute(req, res)
})

server.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`)
})