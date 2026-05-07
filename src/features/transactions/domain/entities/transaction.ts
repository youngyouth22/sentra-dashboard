export type TransactionStatus = 'ALLOW' | 'BLOCK' | 'REVIEW';

export interface Transaction {
  id: string;
  user: string;
  amount: string;
  score: number;
  status: TransactionStatus;
  type: string;
  date: string;
}
