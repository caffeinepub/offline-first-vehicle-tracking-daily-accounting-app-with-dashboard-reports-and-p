// Schema metadata and version management

export const CURRENT_SCHEMA_VERSION = 1;

export const DB_NAME = 'VehicleTrackingDB';
export const DB_VERSION = 1;

export const STORES = {
  WATER_TANK: 'waterTankEntries',
  VEHICLE_WORK: 'vehicleWorkLogs',
  ACCOUNTING: 'accountingTransactions',
  META: 'metadata',
} as const;

export interface SchemaMetadata {
  version: number;
  lastUpdated: string;
}
