// Shared export data shapes

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExportRow {
  [key: string]: string | number;
}

export interface ExportMetadata {
  title: string;
  date: string;
  generatedAt: string;
}

export interface ExportData {
  metadata: ExportMetadata;
  columns: ExportColumn[];
  rows: ExportRow[];
  totals?: ExportRow;
}
