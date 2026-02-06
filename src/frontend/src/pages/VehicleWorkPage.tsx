// Vehicle work module page

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateSelector } from '@/components/DateSelector';
import { VehicleWorkForm } from '@/features/vehicleWork/VehicleWorkForm';
import { VehicleWorkList } from '@/features/vehicleWork/VehicleWorkList';
import {
  getVehicleWorkLogsByDate,
  createVehicleWorkLog,
  updateVehicleWorkLog,
  deleteVehicleWorkLog,
} from '@/localDb';
import type { VehicleWorkLog } from '@/localDb/types';
import { getTodayDate } from '@/lib/format';

export function VehicleWorkPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [logs, setLogs] = useState<VehicleWorkLog[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<VehicleWorkLog | undefined>();

  const loadLogs = async () => {
    const data = await getVehicleWorkLogsByDate(selectedDate);
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, [selectedDate]);

  const handleSubmit = async (data: Omit<VehicleWorkLog, 'id'> & { id?: string }) => {
    if (data.id) {
      await updateVehicleWorkLog(data as VehicleWorkLog);
    } else {
      const newLog: VehicleWorkLog = {
        ...data,
        id: `vw-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      } as VehicleWorkLog;
      await createVehicleWorkLog(newLog);
    }
    setIsFormOpen(false);
    setEditingLog(undefined);
    loadLogs();
  };

  const handleEdit = (log: VehicleWorkLog) => {
    setEditingLog(log);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteVehicleWorkLog(id);
    loadLogs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehicle Work</h2>
          <p className="text-muted-foreground">Track JCB and HYDRO work logs</p>
        </div>
        <Button onClick={() => { setEditingLog(undefined); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Log
        </Button>
      </div>

      <DateSelector value={selectedDate} onChange={setSelectedDate} />

      <VehicleWorkList logs={logs} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLog ? 'Edit' : 'Add'} Vehicle Work Log</DialogTitle>
          </DialogHeader>
          <VehicleWorkForm
            log={editingLog}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setEditingLog(undefined); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
