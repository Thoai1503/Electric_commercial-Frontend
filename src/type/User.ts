export interface UserDataRespone {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer" | null;
}

export interface UserRespone {
  success: boolean;
  token: string;
  user: UserDataRespone;
}
