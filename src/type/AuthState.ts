export interface AuthState {
  isAuthenticated: boolean;
  user: UserAuthenData | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
}

export interface UserAuthenData {
  id: number;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  rule: 1 | 2 | null;
}
