// Water Tank CRUD operations

import { STORES } from '../schema';
import { getAll, getByDate, add, update, remove } from '../client';
import type { WaterTankEntry } from '../types';

export async function getAllWaterTankEntries(): Promise<WaterTankEntry[]> {
  return getAll<WaterTankEntry>(STORES.WATER_TANK);
}

export async function getWaterTankEntriesByDate(date: string): Promise<WaterTankEntry[]> {
  return getByDate<WaterTankEntry>(STORES.WATER_TANK, date);
}

export async function createWaterTankEntry(entry: WaterTankEntry): Promise<void> {
  return add(STORES.WATER_TANK, entry);
}

export async function updateWaterTankEntry(entry: WaterTankEntry): Promise<void> {
  return update(STORES.WATER_TANK, entry);
}

export async function deleteWaterTankEntry(id: string): Promise<void> {
  return remove(STORES.WATER_TANK, id);
}
