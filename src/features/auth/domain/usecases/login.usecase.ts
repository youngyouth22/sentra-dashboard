import { Failure } from '../../../../core/errors/failures';
import { type Either, type UseCase } from '../../../../core/usecases/usecase';
import { type User } from '../entities/user.entity';
import { type AuthRepository } from '../repositories/AuthRepository';

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUseCase implements UseCase<User, LoginParams> {
  private repository: AuthRepository;
  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async execute(params: LoginParams): Promise<Either<Failure, User>> {
    const { user, error } = await this.repository.login(params.email, params.password);
    
    if (error || !user) {
      return { left: { message: error?.message || 'Login failed' } as Failure };
    }
    
    return { right: user as unknown as User };
  }
}
