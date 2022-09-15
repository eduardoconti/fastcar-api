
import { userModelMockData } from "@/../tests/infra/models/mocks"
import { User } from "@/domain/entities"

describe('User Entity', () => {
  it('should create entity', async () => {
    const entity = User.build(userModelMockData);
    expect(entity).toBeDefined()
  })

  it('should throw CreateUserException when login is invalid', () => {
    expect(() => User.build({ ...userModelMockData, login: 'aaa' })).toThrow()
  })

  it('should throw CreateUserException when login is null', () => {
    expect(() => User.build({ ...userModelMockData, login: null } as any)).toThrow()
  })

  it('should throw CreateUserException when name is null', () => {
    expect(() => User.build({ ...userModelMockData, name: null } as any)).toThrow()
  })

  it('should throw CreateUserException when name less than 2', () => {
    expect(() => User.build({ ...userModelMockData, name: 'A' } as any)).toThrow()
  })

  it('should throw CreateUserException when password is null', () => {
    expect(() => User.build({ ...userModelMockData, password: null } as any)).toThrow()
  })

})