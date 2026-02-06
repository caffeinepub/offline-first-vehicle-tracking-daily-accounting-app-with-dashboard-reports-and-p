// Accounting totals calculations

import type { AccountingTransaction } from '@/localDb/types';

export interface AccountingTotals {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export function calculateAccountingTotals(transactions: AccountingTransaction[]): AccountingTotals {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'Received') {
      totalIncome += transaction.amount;
    } else if (transaction.type === 'Paid') {
      totalExpenses += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    balance,
  };
}
