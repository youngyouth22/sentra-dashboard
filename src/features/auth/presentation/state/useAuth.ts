import { useState } from 'react';
import { type User } from '../../domain/entities/user.entity';
import { LoginUseCase } from '../../domain/usecases/login.usecase';
import { AuthRepositoryImpl } from '../../data/repositories/auth.repository_impl';

// In a real enterprise app, you would use Dependency Injection (e.g., Inversify) 
// or a Service Locator to get these instances.
const authRepository = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepository);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const result = await loginUseCase.execute({ email, password });

    if (result.type === 'right') {
      setUser(result.value);
    } else {
      setError(result.value.message);
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
