// JCB/HYDRO work log form with live calculations

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { validateVehicleWorkLog, type VehicleWorkValidationErrors } from './validation';
import { calculateWorkingHours, calculatePayment } from './calculations';
import type { VehicleWorkLog } from '@/localDb/types';
import { getTodayDate, formatNumber, formatCurrency } from '@/lib/format';

interface VehicleWorkFormProps {
  log?: VehicleWorkLog;
  onSubmit: (log: Omit<VehicleWorkLog, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export function VehicleWorkForm({ log, onSubmit, onCancel }: VehicleWorkFormProps) {
  const [formData, setFormData] = useState({
    date: log?.date || getTodayDate(),
    vehicleType: log?.vehicleType || '',
    driverName: log?.driverName || '',
    startTime: log?.startTime || '',
    endTime: log?.endTime || '',
    hourlyRate: log?.hourlyRate?.toString() || '',
  });
  const [errors, setErrors] = useState<VehicleWorkValidationErrors>({});

  const totalHours = calculateWorkingHours(formData.startTime, formData.endTime);
  const totalPayment = calculatePayment(totalHours, parseFloat(formData.hourlyRate) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateVehicleWorkLog(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...(log && { id: log.id }),
      date: formData.date,
      vehicleType: formData.vehicleType as 'JCB' | 'HYDRO',
      driverName: formData.driverName,
      startTime: formData.startTime,
      endTime: formData.endTime,
      hourlyRate: parseFloat(formData.hourlyRate),
      totalHours,
      totalPayment,
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
          <Label htmlFor="vehicleType">Vehicle Type *</Label>
          <Select value={formData.vehicleType} onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}>
            <SelectTrigger id="vehicleType">
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JCB">JCB</SelectItem>
              <SelectItem value="HYDRO">HYDRO</SelectItem>
            </SelectContent>
          </Select>
          {errors.vehicleType && <p className="text-sm text-destructive">{errors.vehicleType}</p>}
        </div>
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time *</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
          {errors.startTime && <p className="text-sm text-destructive">{errors.startTime}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">End Time *</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
          {errors.endTime && <p className="text-sm text-destructive">{errors.endTime}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
        <Input
          id="hourlyRate"
          type="number"
          step="0.01"
          value={formData.hourlyRate}
          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
          placeholder="Enter hourly rate"
        />
        {errors.hourlyRate && <p className="text-sm text-destructive">{errors.hourlyRate}</p>}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-2xl font-bold">{formatNumber(totalHours)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {log ? 'Update' : 'Create'} Log
        </Button>
      </div>
    </form>
  );
}
