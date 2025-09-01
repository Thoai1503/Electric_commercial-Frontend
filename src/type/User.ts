export interface UserDataRespone {
  id: number;
  name: string;
  email: string;
  role: 1 | 2;
  status: number;
}

export interface UserRespone {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: UserDataRespone | null;
}

export interface UserLogin {
  email: string;
  password: string;
}
