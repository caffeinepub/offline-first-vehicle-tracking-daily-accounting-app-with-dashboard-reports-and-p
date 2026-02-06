// Dashboard page with KPI cards

import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { DollarSign, TrendingUp, TrendingDown, Clock, Droplet } from 'lucide-react';
import { KpiCard } from '@/features/dashboard/KpiCard';
import { calculateDashboardKPIs } from '@/features/dashboard/kpis';
import { getWaterTankEntriesByDate, getVehicleWorkLogsByDate, getAccountingTransactionsByDate } from '@/localDb';
import { formatCurrency, formatNumber, getTodayDate } from '@/lib/format';

export function DashboardPage() {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState({
    todayIncome: 0,
    todayExpenses: 0,
    todayBalance: 0,
    todayVehicleHours: 0,
    todayWaterTankCount: 0,
  });

  useEffect(() => {
    const loadKpis = async () => {
      const today = getTodayDate();
      const [waterTank, vehicleWork, accounting] = await Promise.all([
        getWaterTankEntriesByDate(today),
        getVehicleWorkLogsByDate(today),
        getAccountingTransactionsByDate(today),
      ]);

      const calculatedKpis = calculateDashboardKPIs(waterTank, vehicleWork, accounting);
      setKpis(calculatedKpis);
    };

    loadKpis();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Today's overview at a glance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title="Today's Income"
          value={formatCurrency(kpis.todayIncome)}
          icon={<TrendingUp className="h-4 w-4" />}
          onClick={() => navigate({ to: '/accounting' })}
          className="border-l-4 border-l-green-500"
        />
        
        <KpiCard
          title="Today's Expenses"
          value={formatCurrency(kpis.todayExpenses)}
          icon={<TrendingDown className="h-4 w-4" />}
          onClick={() => navigate({ to: '/accounting' })}
          className="border-l-4 border-l-red-500"
        />
        
        <KpiCard
          title="Balance in Hand"
          value={formatCurrency(kpis.todayBalance)}
          icon={<DollarSign className="h-4 w-4" />}
          onClick={() => navigate({ to: '/accounting' })}
          className="border-l-4 border-l-primary"
        />
        
        <KpiCard
          title="Vehicle Hours"
          value={formatNumber(kpis.todayVehicleHours)}
          icon={<Clock className="h-4 w-4" />}
          onClick={() => navigate({ to: '/vehicle-work' })}
          className="border-l-4 border-l-orange-500"
        />
        
        <KpiCard
          title="Water Tank Entries"
          value={kpis.todayWaterTankCount}
          icon={<Droplet className="h-4 w-4" />}
          onClick={() => navigate({ to: '/water-tank' })}
          className="border-l-4 border-l-blue-500"
        />
      </div>
    </div>
  );
}
