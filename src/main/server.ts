import './config/module-alias'
import 'reflect-metadata'
import * as http from 'http'
import { CreateUserControllerFactory, ListUserControllerFactory } from './factories/controllers/user'
import { Router } from '../external/router/router'
import { Http } from '../external/interfaces'
import { OrmClientAdapter } from '../infra/adapters'

import { HealthCheckControllerFactory } from './factories/controllers/health'
import { Logger } from '@/infra/logger'
import { AuthControllerFactory } from './factories/controllers/auth'


const routerManager = new Router()
const orm = new OrmClientAdapter().adapt()
const logger = new Logger()
const createUserController = CreateUserControllerFactory.build(orm)
const listUserController = ListUserControllerFactory.build(orm)
const healthCheckController = HealthCheckControllerFactory.build()
const authController = AuthControllerFactory.build(orm)

routerManager.post({ path: '/login', controller: authController })
routerManager.post({ path: '/user', controller: createUserController, auth: 'bearer' })
routerManager.get({ path: '/user', controller: listUserController, auth: 'bearer' })
routerManager.get({ path: '/', controller: healthCheckController })

const server = http.createServer(async (req: Http.Request, res: Http.Response) => {
  await routerManager.execute(req, res)
})

server.listen(process.env.PORT, () => {
  logger.system(`server started on port: ${process.env.PORT}`)
})