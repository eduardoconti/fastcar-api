import './config/module-alias'
import 'reflect-metadata'
import * as http from 'http'
import { CreateUserControllerFactory, ListUserControllerFactory } from './factories/controllers/user'
import { Router } from '../external/router/router'
import { Http } from '../external/interfaces'
import { OrmClientAdapter } from './adapters'
import { Logger } from '../app/use-cases/logger'
import { HealthCheckControllerFactory } from './factories/controllers/health'

const routerManager = new Router()
const orm = new OrmClientAdapter().adapt()
const logger = new Logger()
const createUserController = CreateUserControllerFactory.build(orm)
const listUserController = ListUserControllerFactory.build(orm)
const healthCheckController = HealthCheckControllerFactory.build()

routerManager.post('/user', createUserController)
routerManager.get('/user', listUserController)
routerManager.get('/', healthCheckController)

const server = http.createServer(async (req: Http.Request, res: Http.Response) => {
  await routerManager.execute(req, res)
})

server.listen(process.env.PORT, () => {
  logger.system(`server started on port: ${process.env.PORT}`)
})