import UserRepository from '../repositories/user.repository';
import {
  CreateUserInput,
  User,
  PublicUser,
  UpdatedUserInput,
} from '../models/user.model.js';

export default class UserService {
  static async findAll() {
    return UserRepository.findAllUsers();
  }

  static async findById(id: string): Promise<PublicUser> {
    const user = await UserRepository.findUserById(id);

    if (!user) {
      throw new Error('Usuário não existe!');
    }

    const { password: _, ...publicUser } = user;
    return publicUser;
  }

  static async createUser(dados: CreateUserInput): Promise<PublicUser> {
    const { email } = dados;
    const isUser = await UserRepository.findUserByEmail(email);

    if (isUser) {
      throw new Error('Usuario já existe');
    }

    const user = await UserRepository.createUser(dados);

    const { password: _, ...publicUser } = user;
    return publicUser;
  }

  static async updateUser(
    id: string,
    dados: UpdatedUserInput,
  ): Promise<PublicUser> {
    const newUser = await UserRepository.updateUser(id, dados);
    return newUser;
  }

  static async deleteUser(id: string): Promise<PublicUser> {
    const user = await UserRepository.deleteUser(id);
    return user;
  }
}
