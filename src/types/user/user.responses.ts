import { User } from './user.types';
import { Vision } from '../vision/vision.types';

export interface UserWithVisions extends User {
  visiones: Vision[];
}

export type FindAllUsersResponse = UserWithVisions[];
export type FindUserByIdResponse = UserWithVisions | null;
export type FindUserByEmailResponse = User | null;
export type CreateUserResponse = User;
export type UpsertUserResponse = User;
export type DeleteUserResponse = User;
