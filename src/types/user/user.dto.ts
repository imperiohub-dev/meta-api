export interface CreateUserDto {
  email: string;
  nombre: string;
}

export interface UpdateUserDto {
  email?: string;
  nombre?: string;
}

export interface UpsertUserDto {
  id?: string;
  email: string;
  nombre: string;
}
