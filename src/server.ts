import './app/config/module-alias'
import "reflect-metadata"
import * as http from "http"
import { CreateUserControllerFactory, ListUserControllerFactory } from './main/factories/controllers/user'
import { Router } from './external/router/router'
import { Http } from './external/interfaces'
import { OrmClientAdapter } from './main/adapters'
import { Logger } from './app/use-cases/logger'

const routerManager = new Router()
const orm = new OrmClientAdapter().adapt()
const logger = new Logger()
const createUserController = CreateUserControllerFactory.build(orm)
const listUserController = ListUserControllerFactory.build(orm)
routerManager.post('/user', createUserController)
routerManager.get('/user', listUserController)

const server = http.createServer(async (req: Http.Request, res: Http.Response) => {
  await routerManager.execute(req, res)
})

server.listen(process.env.PORT, () => {
  logger.system(`server started on port: ${process.env.PORT}`)
})