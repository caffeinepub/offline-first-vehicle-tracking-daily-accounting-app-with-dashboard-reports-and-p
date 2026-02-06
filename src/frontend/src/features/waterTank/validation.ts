// Water Tank form validation

export interface WaterTankValidationErrors {
  [key: string]: string | undefined;
  date?: string;
  time?: string;
  category?: string;
  partyName?: string;
  driverName?: string;
}

export function validateWaterTankEntry(data: {
  date: string;
  time: string;
  category: string;
  partyName: string;
  driverName: string;
}): WaterTankValidationErrors {
  const errors: WaterTankValidationErrors = {};

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.time) {
    errors.time = 'Time is required';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.partyName || data.partyName.trim().length === 0) {
    errors.partyName = 'Party name is required';
  }

  if (!data.driverName || data.driverName.trim().length === 0) {
    errors.driverName = 'Driver name is required';
  }

  return errors;
}
