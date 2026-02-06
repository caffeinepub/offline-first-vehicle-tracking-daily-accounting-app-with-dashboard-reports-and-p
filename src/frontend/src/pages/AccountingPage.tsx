// Accounting module page

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateSelector } from '@/components/DateSelector';
import { AccountingForm } from '@/features/accounting/AccountingForm';
import { AccountingList } from '@/features/accounting/AccountingList';
import {
  getAccountingTransactionsByDate,
  createAccountingTransaction,
  updateAccountingTransaction,
  deleteAccountingTransaction,
} from '@/localDb';
import type { AccountingTransaction } from '@/localDb/types';
import { getTodayDate } from '@/lib/format';

export function AccountingPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [transactions, setTransactions] = useState<AccountingTransaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<AccountingTransaction | undefined>();

  const loadTransactions = async () => {
    const data = await getAccountingTransactionsByDate(selectedDate);
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, [selectedDate]);

  const handleSubmit = async (data: Omit<AccountingTransaction, 'id'> & { id?: string }) => {
    if (data.id) {
      await updateAccountingTransaction(data as AccountingTransaction);
    } else {
      const newTransaction: AccountingTransaction = {
        ...data,
        id: `acc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      } as AccountingTransaction;
      await createAccountingTransaction(newTransaction);
    }
    setIsFormOpen(false);
    setEditingTransaction(undefined);
    loadTransactions();
  };

  const handleEdit = (transaction: AccountingTransaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteAccountingTransaction(id);
    loadTransactions();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Accounting</h2>
          <p className="text-muted-foreground">Track daily income and expenses</p>
        </div>
        <Button onClick={() => { setEditingTransaction(undefined); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <DateSelector value={selectedDate} onChange={setSelectedDate} />

      <AccountingList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTransaction ? 'Edit' : 'Add'} Transaction</DialogTitle>
          </DialogHeader>
          <AccountingForm
            transaction={editingTransaction}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setEditingTransaction(undefined); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
