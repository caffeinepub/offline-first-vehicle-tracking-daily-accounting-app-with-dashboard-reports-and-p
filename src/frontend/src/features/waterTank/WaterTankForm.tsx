// Water Tank create/edit form

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateWaterTankEntry, type WaterTankValidationErrors } from './validation';
import type { WaterTankEntry } from '@/localDb/types';
import { getTodayDate, getCurrentTime } from '@/lib/format';

interface WaterTankFormProps {
  entry?: WaterTankEntry;
  onSubmit: (entry: Omit<WaterTankEntry, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export function WaterTankForm({ entry, onSubmit, onCancel }: WaterTankFormProps) {
  const [formData, setFormData] = useState({
    date: entry?.date || getTodayDate(),
    time: entry?.time || getCurrentTime(),
    category: entry?.category || '',
    partyName: entry?.partyName || '',
    driverName: entry?.driverName || '',
    notes: entry?.notes || '',
  });
  const [errors, setErrors] = useState<WaterTankValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateWaterTankEntry(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...(entry && { id: entry.id }),
      ...formData,
      category: formData.category as 'Salt Water' | 'Drinking Water',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Salt Water">Salt Water</SelectItem>
            <SelectItem value="Drinking Water">Drinking Water</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="partyName">Party Name *</Label>
        <Input
          id="partyName"
          value={formData.partyName}
          onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
          placeholder="Enter party name"
        />
        {errors.partyName && <p className="text-sm text-destructive">{errors.partyName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="driverName">Driver Name *</Label>
        <Input
          id="driverName"
          value={formData.driverName}
          onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
          placeholder="Enter driver name"
        />
        {errors.driverName && <p className="text-sm text-destructive">{errors.driverName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes (optional)"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {entry ? 'Update' : 'Create'} Entry
        </Button>
      </div>
    </form>
  );
}
