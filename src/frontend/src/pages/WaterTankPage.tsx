// Water Tank module page

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DateSelector } from '@/components/DateSelector';
import { WaterTankForm } from '@/features/waterTank/WaterTankForm';
import { WaterTankList } from '@/features/waterTank/WaterTankList';
import {
  getWaterTankEntriesByDate,
  createWaterTankEntry,
  updateWaterTankEntry,
  deleteWaterTankEntry,
} from '@/localDb';
import type { WaterTankEntry } from '@/localDb/types';
import { getTodayDate } from '@/lib/format';

export function WaterTankPage() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [entries, setEntries] = useState<WaterTankEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WaterTankEntry | undefined>();

  const loadEntries = async () => {
    const data = await getWaterTankEntriesByDate(selectedDate);
    setEntries(data);
  };

  useEffect(() => {
    loadEntries();
  }, [selectedDate]);

  const handleSubmit = async (data: Omit<WaterTankEntry, 'id'> & { id?: string }) => {
    if (data.id) {
      await updateWaterTankEntry(data as WaterTankEntry);
    } else {
      const newEntry: WaterTankEntry = {
        ...data,
        id: `wt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      } as WaterTankEntry;
      await createWaterTankEntry(newEntry);
    }
    setIsFormOpen(false);
    setEditingEntry(undefined);
    loadEntries();
  };

  const handleEdit = (entry: WaterTankEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteWaterTankEntry(id);
    loadEntries();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Water Tank</h2>
          <p className="text-muted-foreground">Manage water tank vehicle entries</p>
        </div>
        <Button onClick={() => { setEditingEntry(undefined); setIsFormOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <DateSelector value={selectedDate} onChange={setSelectedDate} />

      <WaterTankList entries={entries} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEntry ? 'Edit' : 'Add'} Water Tank Entry</DialogTitle>
          </DialogHeader>
          <WaterTankForm
            entry={editingEntry}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setEditingEntry(undefined); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
