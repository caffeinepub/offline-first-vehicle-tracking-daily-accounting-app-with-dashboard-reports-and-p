// Shared date selector component

import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
  label?: string;
}

export function DateSelector({ value, onChange, label = 'Select Date' }: DateSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="date-selector" className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id="date-selector"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}
