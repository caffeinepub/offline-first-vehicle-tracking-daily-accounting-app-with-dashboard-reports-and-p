// Accounting report view with export

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { ExportActions } from './ExportActions';
import { getAccountingTransactionsByDate } from '@/localDb';
import { calculateAccountingTotals } from '@/features/accounting/calculations';
import type { AccountingTransaction } from '@/localDb/types';
import { formatDate, formatCurrency } from '@/lib/format';
import { exportToPDF } from '@/lib/export/pdf';
import { exportToExcel } from '@/lib/export/excel';

interface AccountingReportProps {
  selectedDate: string;
}

export function AccountingReport({ selectedDate }: AccountingReportProps) {
  const [transactions, setTransactions] = useState<AccountingTransaction[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getAccountingTransactionsByDate(selectedDate);
      setTransactions(data);
    };
    loadData();
  }, [selectedDate]);

  const totals = calculateAccountingTotals(transactions);

  const handleExportPDF = async () => {
    await exportToPDF({
      title: 'Accounting Report',
      date: formatDate(selectedDate),
      headers: ['Type', 'Person', 'Amount', 'Notes'],
      rows: transactions.map((t) => [
        t.type,
        t.personName,
        formatCurrency(t.amount),
        t.notes || '-',
      ]),
      totals: [
        'Summary',
        `Income: ${formatCurrency(totals.totalIncome)} | Expenses: ${formatCurrency(totals.totalExpenses)}`,
        `Balance: ${formatCurrency(totals.balance)}`,
        '',
      ],
    });
  };

  const handleExportExcel = async () => {
    await exportToExcel({
      title: 'Accounting Report',
      date: formatDate(selectedDate),
      headers: ['Type', 'Person', 'Amount', 'Notes'],
      rows: transactions.map((t) => [
        t.type,
        t.personName,
        t.amount,
        t.notes || '-',
      ]),
      totals: ['Total Income', formatCurrency(totals.totalIncome), 'Total Expenses', formatCurrency(totals.totalExpenses)],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Accounting Transactions</CardTitle>
          <ExportActions onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No transactions for this date</p>
        ) : (
          <>
            <div className="overflow-x-auto mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Person</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.personName}</TableCell>
                      <TableCell className={transaction.type === 'Received' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{transaction.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Total Income</TableCell>
                    <TableCell className="font-bold text-green-600">{formatCurrency(totals.totalIncome)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Total Expenses</TableCell>
                    <TableCell className="font-bold text-red-600">{formatCurrency(totals.totalExpenses)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="font-bold">Balance</TableCell>
                    <TableCell className={`font-bold ${totals.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(totals.balance)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
