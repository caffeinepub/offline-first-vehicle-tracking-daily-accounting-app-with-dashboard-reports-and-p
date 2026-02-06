// Vehicle Work report view with export

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { ExportActions } from './ExportActions';
import { getVehicleWorkLogsByDate } from '@/localDb';
import type { VehicleWorkLog } from '@/localDb/types';
import { formatTime, formatDate, formatNumber, formatCurrency } from '@/lib/format';
import { exportToPDF } from '@/lib/export/pdf';
import { exportToExcel } from '@/lib/export/excel';

interface VehicleWorkReportProps {
  selectedDate: string;
}

export function VehicleWorkReport({ selectedDate }: VehicleWorkReportProps) {
  const [logs, setLogs] = useState<VehicleWorkLog[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getVehicleWorkLogsByDate(selectedDate);
      setLogs(data);
    };
    loadData();
  }, [selectedDate]);

  const totalHours = logs.reduce((sum, log) => sum + log.totalHours, 0);
  const totalPayment = logs.reduce((sum, log) => sum + log.totalPayment, 0);

  const handleExportPDF = async () => {
    await exportToPDF({
      title: 'Vehicle Work Report',
      date: formatDate(selectedDate),
      headers: ['Vehicle', 'Driver', 'Start', 'End', 'Hours', 'Rate', 'Payment'],
      rows: logs.map((log) => [
        log.vehicleType,
        log.driverName,
        formatTime(log.startTime),
        formatTime(log.endTime),
        formatNumber(log.totalHours),
        formatCurrency(log.hourlyRate),
        formatCurrency(log.totalPayment),
      ]),
      totals: ['', '', '', 'Total:', formatNumber(totalHours), '', formatCurrency(totalPayment)],
    });
  };

  const handleExportExcel = async () => {
    await exportToExcel({
      title: 'Vehicle Work Report',
      date: formatDate(selectedDate),
      headers: ['Vehicle', 'Driver', 'Start', 'End', 'Hours', 'Rate', 'Payment'],
      rows: logs.map((log) => [
        log.vehicleType,
        log.driverName,
        formatTime(log.startTime),
        formatTime(log.endTime),
        log.totalHours,
        log.hourlyRate,
        log.totalPayment,
      ]),
      totals: ['', '', '', 'Total:', totalHours, '', totalPayment],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vehicle Work Logs</CardTitle>
          <ExportActions onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No logs for this date</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.vehicleType}</TableCell>
                    <TableCell>{log.driverName}</TableCell>
                    <TableCell>{formatTime(log.startTime)}</TableCell>
                    <TableCell>{formatTime(log.endTime)}</TableCell>
                    <TableCell>{formatNumber(log.totalHours)}</TableCell>
                    <TableCell>{formatCurrency(log.hourlyRate)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(log.totalPayment)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">{formatNumber(totalHours)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="font-bold">{formatCurrency(totalPayment)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
