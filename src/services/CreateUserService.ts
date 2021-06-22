import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const UsersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email is required');
    }

    const userAlreadyExists = await UsersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = UsersRepository.create({ email, name, admin });

    await UsersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
