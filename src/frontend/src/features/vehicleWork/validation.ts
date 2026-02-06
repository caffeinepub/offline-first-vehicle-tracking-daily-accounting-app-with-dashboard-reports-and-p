// Vehicle Work Log validation

export interface VehicleWorkValidationErrors {
  [key: string]: string | undefined;
  date?: string;
  vehicleType?: string;
  driverName?: string;
  startTime?: string;
  endTime?: string;
  hourlyRate?: string;
}

export function validateVehicleWorkLog(data: {
  date: string;
  vehicleType: string;
  driverName: string;
  startTime: string;
  endTime: string;
  hourlyRate: string;
}): VehicleWorkValidationErrors {
  const errors: VehicleWorkValidationErrors = {};

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.vehicleType) {
    errors.vehicleType = 'Vehicle type is required';
  }

  if (!data.driverName || data.driverName.trim().length === 0) {
    errors.driverName = 'Driver name is required';
  }

  if (!data.startTime) {
    errors.startTime = 'Start time is required';
  }

  if (!data.endTime) {
    errors.endTime = 'End time is required';
  }

  if (!data.hourlyRate || data.hourlyRate.trim().length === 0) {
    errors.hourlyRate = 'Hourly rate is required';
  } else {
    const rate = parseFloat(data.hourlyRate);
    if (isNaN(rate) || rate < 0) {
      errors.hourlyRate = 'Hourly rate must be a positive number';
    }
  }

  return errors;
}
