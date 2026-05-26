import UserService from '../services/user.service.js';
import { Request, Response } from 'express';

export default class UserController {
  static async findAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.findAll();
      res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  static async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };

    try {
      const user = await UserService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const dados = req.body;

    try {
      const newUser = await UserService.createUser(dados);
      res.status(200).json(newUser);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const { id, ...dados } = user;

    try {
      const newUser = await UserService.updateUser(id, dados);
      res.status(200).json(newUser);
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };

    if (typeof id === 'string') {
      try {
        const user = await UserService.deleteUser(id);
        res.status(200).json(user);
      } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
      }
    }
  }
}
