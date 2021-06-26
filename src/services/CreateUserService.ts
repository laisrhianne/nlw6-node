import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const UsersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email is required');
    }

    const userAlreadyExists = await UsersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = UsersRepository.create({ email, name, admin, password: passwordHash });

    await UsersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
