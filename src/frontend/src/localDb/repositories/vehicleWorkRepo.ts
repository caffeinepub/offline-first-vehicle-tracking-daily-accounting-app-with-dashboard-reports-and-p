// Vehicle Work Log CRUD operations

import { STORES } from '../schema';
import { getAll, getByDate, add, update, remove } from '../client';
import type { VehicleWorkLog } from '../types';

export async function getAllVehicleWorkLogs(): Promise<VehicleWorkLog[]> {
  return getAll<VehicleWorkLog>(STORES.VEHICLE_WORK);
}

export async function getVehicleWorkLogsByDate(date: string): Promise<VehicleWorkLog[]> {
  return getByDate<VehicleWorkLog>(STORES.VEHICLE_WORK, date);
}

export async function createVehicleWorkLog(log: VehicleWorkLog): Promise<void> {
  return add(STORES.VEHICLE_WORK, log);
}

export async function updateVehicleWorkLog(log: VehicleWorkLog): Promise<void> {
  return update(STORES.VEHICLE_WORK, log);
}

export async function deleteVehicleWorkLog(id: string): Promise<void> {
  return remove(STORES.VEHICLE_WORK, id);
}
