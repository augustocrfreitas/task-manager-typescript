import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { CreateUserInput, PublicUser } from '../models/user.model.js';

export class UserController {
  static async findAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ erro: err.message });
    }
  }
  static async findUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const user = await UserService.findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ erro: err.message });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const user = req.body;

    try {
      const result = await UserService.createUser(user);
      res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ erro: err.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const result = await UserService.login(email, password);
      res.status(200).json({
        message: 'Usuario logado com sucesso!',
        token: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ erro: err.message });
    }
  }
}
