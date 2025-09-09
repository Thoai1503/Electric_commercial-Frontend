export interface AuthState {
  isAuthenticated: boolean;
  user: UserAuthenData | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: any | null;
}

export interface UserAuthenData {
  id: number;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  role: 1 | 2 | null;
}
