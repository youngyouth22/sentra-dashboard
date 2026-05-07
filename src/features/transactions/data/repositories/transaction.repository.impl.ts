import { ITransactionRepository } from "../../domain/repositories/transaction.repository";
import type { Transaction } from "../../domain/entities/transaction";
import { TransactionRemoteDataSource } from "../datasources/transaction.remote.datasource";

export class TransactionRepositoryImpl extends ITransactionRepository {
  constructor(private readonly dataSource: TransactionRemoteDataSource) {
    super();
  }

  async list(): Promise<Transaction[]> {
    return this.dataSource.list();
  }
}
