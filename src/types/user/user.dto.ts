export interface CreateUserDto {
  email: string;
  nombre: string;
  picture?: string;
  googleId?: string;
}

export interface UpdateUserDto {
  email?: string;
  nombre?: string;
  picture?: string;
  googleId?: string;
}

export interface UpsertUserDto {
  id?: string;
  email: string;
  nombre: string;
  picture?: string;
  googleId?: string;
}

export interface GoogleMobileAuthDto {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes: string[];
  /**
   * JWT (JSON Web Token) that serves as a secure credential for your user's identity.
   */
  idToken: string | null;
  /**
   * Not null only if a valid webClientId and offlineAccess: true was
   * specified in configure().
   */
  serverAuthCode: string | null;
}
