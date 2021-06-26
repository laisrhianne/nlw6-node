import { getCustomRepository, Not } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { UsersRepositories } from '../repositories/UsersRepositories';

class ListUsersService {
  async execute(user_id: string) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = await usersRepositories.find({
      id: Not(user_id),
    });

    return classToPlain(users);
  }
}

export { ListUsersService };
