// KPI selectors for dashboard

import type { WaterTankEntry, VehicleWorkLog, AccountingTransaction } from '@/localDb/types';
import { calculateAccountingTotals } from '../accounting/calculations';

export interface DashboardKPIs {
  todayIncome: number;
  todayExpenses: number;
  todayBalance: number;
  todayVehicleHours: number;
  todayWaterTankCount: number;
}

export function calculateDashboardKPIs(
  waterTankEntries: WaterTankEntry[],
  vehicleWorkLogs: VehicleWorkLog[],
  accountingTransactions: AccountingTransaction[]
): DashboardKPIs {
  const totals = calculateAccountingTotals(accountingTransactions);
  
  const totalVehicleHours = vehicleWorkLogs.reduce((sum, log) => sum + log.totalHours, 0);

  return {
    todayIncome: totals.totalIncome,
    todayExpenses: totals.totalExpenses,
    todayBalance: totals.balance,
    todayVehicleHours: totalVehicleHours,
    todayWaterTankCount: waterTankEntries.length,
  };
}
