export abstract class Failure {
  readonly message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export class ServerFailure extends Failure {
  constructor(message: string = 'A server error occurred') {
    super(message);
  }
}

export class CacheFailure extends Failure {
  constructor(message: string = 'A cache error occurred') {
    super(message);
  }
}

export class NetworkFailure extends Failure {
  constructor(message: string = 'No internet connection') {
    super(message);
  }
}

export class ValidationFailure extends Failure {
  constructor(message: string = 'Invalid input') {
    super(message);
  }
}