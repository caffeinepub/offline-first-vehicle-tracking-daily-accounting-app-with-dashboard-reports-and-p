// Vehicle work log list with totals

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import type { VehicleWorkLog } from '@/localDb/types';
import { formatTime, formatNumber, formatCurrency } from '@/lib/format';

interface VehicleWorkListProps {
  logs: VehicleWorkLog[];
  onEdit: (log: VehicleWorkLog) => void;
  onDelete: (id: string) => void;
}

export function VehicleWorkList({ logs, onEdit, onDelete }: VehicleWorkListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalHours = logs.reduce((sum, log) => sum + log.totalHours, 0);
  const totalPayment = logs.reduce((sum, log) => sum + log.totalPayment, 0);

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No vehicle work logs for this date
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-4 bg-muted/50">
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

      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{log.driverName}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatTime(log.startTime)} - {formatTime(log.endTime)}</span>
                  </div>
                </div>
                <Badge variant={log.vehicleType === 'JCB' ? 'default' : 'secondary'}>
                  {log.vehicleType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Hours</p>
                  <p className="font-semibold">{formatNumber(log.totalHours)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rate</p>
                  <p className="font-semibold">{formatCurrency(log.hourlyRate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment</p>
                  <p className="font-semibold">{formatCurrency(log.totalPayment)}</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" onClick={() => onEdit(log)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDeleteId(log.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
          }
        }}
        title="Delete Vehicle Work Log"
        description="Are you sure you want to delete this work log? This action cannot be undone."
      />
    </>
  );
}
