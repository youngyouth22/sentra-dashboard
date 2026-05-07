import { useState } from 'react';
import { type User } from '../../domain/entities/user.entity';
import { LoginUseCase } from '../../domain/usecases/login.usecase';
import { SupabaseAuthRepository } from '../../data/repositories/SupabaseAuthRepository';

const authRepository = new SupabaseAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const result = await loginUseCase.execute({ email, password });

    if (result.right) {
      setUser(result.right);
    } else if (result.left) {
      setError(result.left.message);
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
