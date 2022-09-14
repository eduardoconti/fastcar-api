import { User } from "@/domain/entities";
import { CreateUserException } from "@/domain/exceptions";
import { CreateUserDTO, ICreateUser, IUserRepository } from "@/domain/use-cases/user";
import { IUuid } from "@/domain/use-cases/uuid";

export class CreateUser implements ICreateUser {
  constructor(
    private readonly uuidGenerator: IUuid,
    private readonly userRepository: IUserRepository) {
  }
  async create(user: CreateUserDTO): Promise<User> {
    await this.validate(user)
    const userEntity = User.build(user)
    return await this.userRepository.add(User.build({
      id: this.uuidGenerator.uuidV4(),
      ...userEntity,
    }))
  }

  private async validate(user: CreateUserDTO): Promise<void> {
    if (await this.userRepository.findOne({ login: user.login })) {
      console.log(new CreateUserException('This login belongs to a user').detail)
      throw new CreateUserException('This login belongs to a user')
    }

    if(!user.confirmPassword){
      throw new CreateUserException('confirmPassword should be not empty')
    }
  }
}