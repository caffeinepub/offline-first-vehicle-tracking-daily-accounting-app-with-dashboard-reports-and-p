// Excel export helper using CSV format

export async function exportToExcel(data: {
  title: string;
  date: string;
  headers: string[];
  rows: (string | number)[][];
  totals?: (string | number)[];
}): Promise<void> {
  try {
    // Create CSV content
    const csvRows: string[] = [];
    
    // Add title and metadata
    csvRows.push(`"${data.title}"`);
    csvRows.push(`"Date: ${data.date}"`);
    csvRows.push(`"Generated: ${new Date().toLocaleString('en-IN')}"`);
    csvRows.push(''); // Empty row
    
    // Add headers
    csvRows.push(data.headers.map(h => `"${h}"`).join(','));
    
    // Add data rows
    data.rows.forEach(row => {
      csvRows.push(row.map(cell => {
        const cellStr = String(cell);
        // Escape quotes and wrap in quotes if contains comma or quote
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(','));
    });
    
    // Add totals if present
    if (data.totals) {
      csvRows.push(data.totals.map(cell => {
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(','));
    }
    
    // Create blob and download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.title.replace(/\s+/g, '_')}_${data.date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Excel export failed:', error);
    alert('Failed to export Excel. Please try again.');
  }
}
