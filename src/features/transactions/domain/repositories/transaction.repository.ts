import type { Transaction } from "../entities/transaction";

export abstract class ITransactionRepository {
  abstract list(): Promise<Transaction[]>;
}
