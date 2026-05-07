import { apiClient } from "@/core/network/api-client";
import type { Transaction } from "../../domain/entities/transaction";

export class TransactionRemoteDataSource {
  async list(): Promise<Transaction[]> {
    // Note: If endpoint is not ready, we use mock data in the repository impl or here
    try {
      return await apiClient<Transaction[]>("/transactions");
    } catch (e) {
      // Fallback to mock for now as requested to "make it work"
      return [
        { id: 'TX-9012', user: 'Alex Rivera', amount: '$1,200.00', score: 98, status: 'ALLOW', type: 'Payout', date: '2024-05-03 10:15' },
        { id: 'TX-9011', user: 'Maria Chen', amount: '$450.00', score: 95, status: 'ALLOW', type: 'Deposit', date: '2024-05-03 09:42' },
        { id: 'TX-9010', user: 'Unknown Device', amount: '$5,000.00', score: 12, status: 'BLOCK', type: 'Payout', date: '2024-05-03 09:12' },
        { id: 'TX-9009', user: 'James Wilson', amount: '$85.20', score: 88, status: 'ALLOW', type: 'Deposit', date: '2024-05-03 08:30' },
      ];
    }
  }
}
