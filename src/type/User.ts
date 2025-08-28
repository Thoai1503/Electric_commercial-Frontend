export interface UserDataRespone {
  id: number;
  success: boolean;
  name: string;
  email: string;
  token: string;
  role: 1 | 2;
  user: UserData | null;
}

export interface UserRespone {
  success: boolean;
  token: string;
  user: UserDataRespone | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: 1 | 2 | null;
}
