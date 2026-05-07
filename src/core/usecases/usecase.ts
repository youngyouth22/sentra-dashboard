export type Either<L, R> = 
  | { left: L; right?: never } 
  | { left?: never; right: R };

export interface UseCase<Type, Params> {
  execute(params: Params): Promise<Either<any, Type>>;
}
