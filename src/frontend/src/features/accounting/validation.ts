// Accounting form validation

export interface AccountingValidationErrors {
  [key: string]: string | undefined;
  date?: string;
  type?: string;
  amount?: string;
  personName?: string;
}

export function validateAccountingTransaction(data: {
  date: string;
  type: string;
  amount: string;
  personName: string;
}): AccountingValidationErrors {
  const errors: AccountingValidationErrors = {};

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.type) {
    errors.type = 'Transaction type is required';
  }

  if (!data.amount || data.amount.trim().length === 0) {
    errors.amount = 'Amount is required';
  } else {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }
  }

  if (!data.personName || data.personName.trim().length === 0) {
    errors.personName = 'Person name is required';
  }

  return errors;
}
