// Schema migration logic

import { CURRENT_SCHEMA_VERSION } from './schema';

export interface MigrationContext {
  db: IDBDatabase;
  transaction: IDBTransaction;
  oldVersion: number;
  newVersion: number;
}

export async function runMigrations(context: MigrationContext): Promise<void> {
  const { db, oldVersion } = context;

  // Initial setup (version 0 -> 1)
  if (oldVersion < 1) {
    // Create object stores with indexes
    if (!db.objectStoreNames.contains('waterTankEntries')) {
      const waterTankStore = db.createObjectStore('waterTankEntries', { keyPath: 'id' });
      waterTankStore.createIndex('date', 'date', { unique: false });
    }

    if (!db.objectStoreNames.contains('vehicleWorkLogs')) {
      const vehicleWorkStore = db.createObjectStore('vehicleWorkLogs', { keyPath: 'id' });
      vehicleWorkStore.createIndex('date', 'date', { unique: false });
    }

    if (!db.objectStoreNames.contains('accountingTransactions')) {
      const accountingStore = db.createObjectStore('accountingTransactions', { keyPath: 'id' });
      accountingStore.createIndex('date', 'date', { unique: false });
    }

    if (!db.objectStoreNames.contains('metadata')) {
      db.createObjectStore('metadata', { keyPath: 'key' });
    }
  }

  // Future migrations would go here
  // if (oldVersion < 2) { ... }
}

export function getCurrentSchemaVersion(): number {
  return CURRENT_SCHEMA_VERSION;
}
