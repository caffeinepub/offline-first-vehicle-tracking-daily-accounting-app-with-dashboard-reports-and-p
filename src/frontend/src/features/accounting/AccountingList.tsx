// Accounting transaction list with totals

import { useState } from 'react';
import { Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import type { AccountingTransaction } from '@/localDb/types';
import { calculateAccountingTotals } from './calculations';
import { formatCurrency } from '@/lib/format';

interface AccountingListProps {
  transactions: AccountingTransaction[];
  onEdit: (transaction: AccountingTransaction) => void;
  onDelete: (id: string) => void;
}

export function AccountingList({ transactions, onEdit, onDelete }: AccountingListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totals = calculateAccountingTotals(transactions);

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No accounting transactions for this date
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-4 bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.totalIncome)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totals.totalExpenses)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totals.balance)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{transaction.personName}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.type === 'Received' ? 'default' : 'destructive'}>
                      {transaction.type === 'Received' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {transaction.type}
                    </Badge>
                    <span className="text-lg font-bold">{formatCurrency(transaction.amount)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            {transaction.notes && (
              <CardContent className="pt-0 pb-3">
                <p className="text-sm text-muted-foreground">{transaction.notes}</p>
              </CardContent>
            )}
            <CardContent className="pt-0 flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => onEdit(transaction)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setDeleteId(transaction.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
          }
        }}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
      />
    </>
  );
}
