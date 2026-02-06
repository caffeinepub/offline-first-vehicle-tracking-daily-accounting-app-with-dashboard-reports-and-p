// Water Tank list with edit/delete actions

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import type { WaterTankEntry } from '@/localDb/types';
import { formatTime } from '@/lib/format';

interface WaterTankListProps {
  entries: WaterTankEntry[];
  onEdit: (entry: WaterTankEntry) => void;
  onDelete: (id: string) => void;
}

export function WaterTankList({ entries, onEdit, onDelete }: WaterTankListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No water tank entries for this date
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{entry.partyName}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatTime(entry.time)}</span>
                    <span>•</span>
                    <span>{entry.driverName}</span>
                  </div>
                </div>
                <Badge variant={entry.category === 'Salt Water' ? 'default' : 'secondary'}>
                  {entry.category}
                </Badge>
              </div>
            </CardHeader>
            {entry.notes && (
              <CardContent className="pt-0 pb-3">
                <p className="text-sm text-muted-foreground">{entry.notes}</p>
              </CardContent>
            )}
            <CardContent className="pt-0 flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => onEdit(entry)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setDeleteId(entry.id)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
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
        title="Delete Water Tank Entry"
        description="Are you sure you want to delete this water tank entry? This action cannot be undone."
      />
    </>
  );
}
