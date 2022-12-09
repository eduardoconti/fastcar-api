import { HealthCheckController } from "./health-check.controller"

interface SutTypes {
  sut: HealthCheckController
}

const makeSut = (): SutTypes => {
  const sut = new HealthCheckController()
  return {
    sut,
  }
}
describe('health controller', () => {
  it('should execute controller', async () => {
    const { sut } = makeSut()

    const result = await sut.handle()

    expect(result.isSuccess).toBeTruthy()
  })
})