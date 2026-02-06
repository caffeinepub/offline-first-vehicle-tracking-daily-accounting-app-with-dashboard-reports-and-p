// Reports/Exports page with tabs

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateSelector } from '@/components/DateSelector';
import { WaterTankReport } from '@/features/reports/WaterTankReport';
import { VehicleWorkReport } from '@/features/reports/VehicleWorkReport';
import { AccountingReport } from '@/features/reports/AccountingReport';
import { getTodayDate } from '@/lib/format';

export function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports & Exports</h2>
        <p className="text-muted-foreground">View and export date-wise reports</p>
      </div>

      <DateSelector value={selectedDate} onChange={setSelectedDate} />

      <Tabs defaultValue="water-tank" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="water-tank">Water Tank</TabsTrigger>
          <TabsTrigger value="vehicle-work">Vehicle Work</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
        </TabsList>

        <TabsContent value="water-tank">
          <WaterTankReport selectedDate={selectedDate} />
        </TabsContent>

        <TabsContent value="vehicle-work">
          <VehicleWorkReport selectedDate={selectedDate} />
        </TabsContent>

        <TabsContent value="accounting">
          <AccountingReport selectedDate={selectedDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
