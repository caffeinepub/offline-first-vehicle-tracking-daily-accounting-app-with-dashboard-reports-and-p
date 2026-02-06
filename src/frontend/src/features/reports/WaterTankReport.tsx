// Water Tank report view with export

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExportActions } from './ExportActions';
import { getWaterTankEntriesByDate } from '@/localDb';
import type { WaterTankEntry } from '@/localDb/types';
import { formatTime, formatDate } from '@/lib/format';
import { exportToPDF } from '@/lib/export/pdf';
import { exportToExcel } from '@/lib/export/excel';

interface WaterTankReportProps {
  selectedDate: string;
}

export function WaterTankReport({ selectedDate }: WaterTankReportProps) {
  const [entries, setEntries] = useState<WaterTankEntry[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getWaterTankEntriesByDate(selectedDate);
      setEntries(data);
    };
    loadData();
  }, [selectedDate]);

  const handleExportPDF = async () => {
    await exportToPDF({
      title: 'Water Tank Report',
      date: formatDate(selectedDate),
      headers: ['Time', 'Category', 'Party Name', 'Driver Name', 'Notes'],
      rows: entries.map((e) => [
        formatTime(e.time),
        e.category,
        e.partyName,
        e.driverName,
        e.notes || '-',
      ]),
    });
  };

  const handleExportExcel = async () => {
    await exportToExcel({
      title: 'Water Tank Report',
      date: formatDate(selectedDate),
      headers: ['Time', 'Category', 'Party Name', 'Driver Name', 'Notes'],
      rows: entries.map((e) => [
        formatTime(e.time),
        e.category,
        e.partyName,
        e.driverName,
        e.notes || '-',
      ]),
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Water Tank Entries</CardTitle>
          <ExportActions onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No entries for this date</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatTime(entry.time)}</TableCell>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.partyName}</TableCell>
                    <TableCell>{entry.driverName}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
