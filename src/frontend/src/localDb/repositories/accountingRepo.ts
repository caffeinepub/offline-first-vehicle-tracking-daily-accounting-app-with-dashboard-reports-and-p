// Accounting Transaction CRUD operations

import { STORES } from '../schema';
import { getAll, getByDate, add, update, remove } from '../client';
import type { AccountingTransaction } from '../types';

export async function getAllAccountingTransactions(): Promise<AccountingTransaction[]> {
  return getAll<AccountingTransaction>(STORES.ACCOUNTING);
}

export async function getAccountingTransactionsByDate(date: string): Promise<AccountingTransaction[]> {
  return getByDate<AccountingTransaction>(STORES.ACCOUNTING, date);
}

export async function createAccountingTransaction(transaction: AccountingTransaction): Promise<void> {
  return add(STORES.ACCOUNTING, transaction);
}

export async function updateAccountingTransaction(transaction: AccountingTransaction): Promise<void> {
  return update(STORES.ACCOUNTING, transaction);
}

export async function deleteAccountingTransaction(id: string): Promise<void> {
  return remove(STORES.ACCOUNTING, id);
}
