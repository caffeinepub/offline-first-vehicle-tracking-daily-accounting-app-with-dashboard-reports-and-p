// Accounting transaction form

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateAccountingTransaction, type AccountingValidationErrors } from './validation';
import type { AccountingTransaction } from '@/localDb/types';
import { getTodayDate } from '@/lib/format';

interface AccountingFormProps {
  transaction?: AccountingTransaction;
  onSubmit: (transaction: Omit<AccountingTransaction, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export function AccountingForm({ transaction, onSubmit, onCancel }: AccountingFormProps) {
  const [formData, setFormData] = useState({
    date: transaction?.date || getTodayDate(),
    type: transaction?.type || '',
    amount: transaction?.amount?.toString() || '',
    personName: transaction?.personName || '',
    notes: transaction?.notes || '',
  });
  const [errors, setErrors] = useState<AccountingValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateAccountingTransaction(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...(transaction && { id: transaction.id }),
      date: formData.date,
      type: formData.type as 'Paid' | 'Received',
      amount: parseFloat(formData.amount),
      personName: formData.personName,
      notes: formData.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Received">Received (Income)</SelectItem>
              <SelectItem value="Paid">Paid (Expense)</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (₹) *</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter amount"
        />
        {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="personName">Person Name *</Label>
        <Input
          id="personName"
          value={formData.personName}
          onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
          placeholder="Enter person name"
        />
        {errors.personName && <p className="text-sm text-destructive">{errors.personName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes (optional)"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {transaction ? 'Update' : 'Create'} Transaction
        </Button>
      </div>
    </form>
  );
}
