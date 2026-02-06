// Local-only TypeScript types for offline storage

export interface WaterTankEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  category: 'Salt Water' | 'Drinking Water';
  partyName: string;
  driverName: string;
  notes: string;
}

export interface VehicleWorkLog {
  id: string;
  date: string; // YYYY-MM-DD
  vehicleType: 'JCB' | 'HYDRO';
  driverName: string;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  hourlyRate: number;
  totalHours: number;
  totalPayment: number;
}

export interface AccountingTransaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'Paid' | 'Received';
  amount: number;
  personName: string;
  notes: string;
}

export interface LocalDbSchema {
  version: number;
  waterTankEntries: WaterTankEntry[];
  vehicleWorkLogs: VehicleWorkLog[];
  accountingTransactions: AccountingTransaction[];
}
