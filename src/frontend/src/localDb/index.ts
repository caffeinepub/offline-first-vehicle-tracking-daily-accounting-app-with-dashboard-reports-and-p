// Stable API surface for local data layer

export { initializeDb } from './client';
export * from './repositories/waterTankRepo';
export * from './repositories/vehicleWorkRepo';
export * from './repositories/accountingRepo';
export type { WaterTankEntry, VehicleWorkLog, AccountingTransaction } from './types';
