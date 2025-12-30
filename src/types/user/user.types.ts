export interface User {
  id: string;
  email: string;
  nombre: string;
  picture?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserToken {
  id: string;
  email: string;
  nombre: string;
  picture?: string;
}
