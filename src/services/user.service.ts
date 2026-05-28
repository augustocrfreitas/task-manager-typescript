import { CreateUserInput, PublicUser, User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class UserService {
    static async findAllUsers(): Promise<PublicUser[]> {
        const result = await UserRepository.findAllUsers();

        let usersPublicList: PublicUser[] = [];

        const usersList = result.map((item) => {
            const { password, ...publicResult } = item;
            usersPublicList.push(publicResult);
        });

        return usersPublicList;
    }

    static async findUserById(id: string): Promise<PublicUser> {
        const result = await UserRepository.getUserById(id);

        if (!result) {
            throw new Error('Usuário não existe');
        }

        const { password, ...publicResult } = result;
        return publicResult;
    }

    static async createUser(user: CreateUserInput): Promise<PublicUser> {
        const existing = await UserRepository.getUserByEmail(user.email);

        if (existing) {
            throw new Error('Email já cadastrado');
        }

        const { name, email, password } = user;
        const hashPassword = await bcrypt.hash(password, 10);
        const hashUser = { name, email, password: hashPassword };

        const result = await UserRepository.createUser(hashUser);

        const { password: _, ...publicResult } = result;
        return publicResult;
    }

    static async login(email: string, password: string) {
        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
            throw new Error('Email ou senha inválidos');
        }

        const isCorrectPasword = await bcrypt.compare(password, user.password);

        if (!isCorrectPasword) {
            throw new Error('Email ou senha inválidos');
        }
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.SECRET_KEY as string,
            {
                expiresIn: '8h',
            },
        );
        return token;
    }
}
