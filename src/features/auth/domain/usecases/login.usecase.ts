import { Failure } from '../../../../core/errors/failures';
import { type Either, type UseCase } from '../../../../core/usecases/usecase';
import { type User } from '../entities/user.entity';
import { type AuthRepository } from '../repositories/auth.repository';

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
    return this.repository.login(params.email, params.password);
  }
}
