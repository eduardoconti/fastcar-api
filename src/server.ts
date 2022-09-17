import './app/config/module-alias'
import * as http from "http"
import { CreateUserControllerFactory, ListUserControllerFactory } from './main/factories/controllers/user'
import { Router } from './external/router/router'
import { Http } from './external/interfaces'

const routerManager = new Router()

const controller = new CreateUserControllerFactory().build()
const listUserController = new ListUserControllerFactory().build()

routerManager.post('/user', controller)
routerManager.get('/user', listUserController)

const server = http.createServer(async (req: Http.Request, res: Http.Response) => {
  await routerManager.execute(req, res)
})

server.listen(process.env.PORT, () => {
  console.log('\x1b[36m%s\x1b[0m',`server started on port: ${process.env.PORT}`)
})