export interface AuthState {
  isAuthenticated: boolean;
  user: UserAuthenData | null;
}

export interface UserAuthenData {
  id: number;
  email: string;
  name: string;
  token: string;
  rule: 1 | 2 | null;
}
