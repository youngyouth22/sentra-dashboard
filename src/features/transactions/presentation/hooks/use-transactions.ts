import { useState, useCallback, useEffect } from "react";
import type { Transaction } from "../../domain/entities/transaction";
import { TransactionRepositoryImpl } from "../../data/repositories/transaction.repository.impl";
import { TransactionRemoteDataSource } from "../../data/datasources/transaction.remote.datasource";

const repository = new TransactionRepositoryImpl(new TransactionRemoteDataSource());

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.list();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, refresh: fetchTransactions };
}
