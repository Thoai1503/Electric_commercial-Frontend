import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../reducers/authenReducer';
import { http } from '../../api/http';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: number;
  status: number;
}

interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const useAuthen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Initialize authentication state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        dispatch(setUser(userData));
        
        // Set default authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
  }, [dispatch]);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await http.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Store tokens and user data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Update Redux state
        dispatch(setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          token: accessToken,
          rule: user.role as 1 | 2
        }));
        
        return true;
      } else {
        setError('Login failed');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Register function
  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await http.post<AuthResponse>('/auth/register', userData);
      
      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Store tokens and user data
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Update Redux state
        dispatch(setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          token: accessToken,
          rule: user.role as 1 | 2
        }));
        
        return true;
      } else {
        setError('Registration failed');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout endpoint to invalidate tokens on server
      await http.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Clear authorization header
      delete http.defaults.headers.common['Authorization'];
      
      // Update Redux state
      dispatch(clearUser());
    }
  }, [dispatch]);

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await http.post<AuthResponse>('/auth/refresh-token', {
        refreshToken
      });

      if (response.data.success) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Update stored tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        // Update authorization header
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  }, [logout]);

  // Get current user profile
  const getProfile = useCallback(async (): Promise<User | null> => {
    try {
      const response = await http.get<{ success: boolean; user: User }>('/auth/profile');
      
      if (response.data.success) {
        const user = response.data.user;
        
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update Redux state
        const accessToken = localStorage.getItem('accessToken');
        dispatch(setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          token: accessToken || '',
          rule: user.role as 1 | 2
        }));
        
        return user;
      }
      
      return null;
    } catch (error) {
      console.error('Get profile failed:', error);
      return null;
    }
  }, [dispatch]);

  // Check if user is authenticated
  const isAuthenticated = useCallback((): boolean => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }, []);

  // Check if user is admin
  const isAdmin = useCallback((): boolean => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role === 1; // Assuming role 1 is admin
      } catch (error) {
        return false;
      }
    }
    return false;
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    register,
    logout,
    refreshToken,
    getProfile,
    isAuthenticated,
    isAdmin,
    isLoading,
    error,
    clearError
  };
};

export default useAuthen;
