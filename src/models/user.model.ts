export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatedUserInput = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt'>
>;

export type PublicUser = Omit<CreateUserInput, 'password'>;
