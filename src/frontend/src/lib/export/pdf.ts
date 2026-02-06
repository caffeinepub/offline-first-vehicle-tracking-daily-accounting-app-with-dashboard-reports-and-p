// PDF export helper using browser print functionality

export async function exportToPDF(data: {
  title: string;
  date: string;
  headers: string[];
  rows: (string | number)[][];
  totals?: (string | number)[];
}): Promise<void> {
  try {
    // Create a printable HTML document
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to export PDF');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #000;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .meta {
              font-size: 14px;
              color: #666;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #2980b9;
              color: white;
              font-weight: bold;
            }
            tfoot td {
              background-color: #34495e;
              color: white;
              font-weight: bold;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <h1>${data.title}</h1>
          <div class="meta">
            <div>Date: ${data.date}</div>
            <div>Generated: ${new Date().toLocaleString('en-IN')}</div>
          </div>
          <table>
            <thead>
              <tr>
                ${data.headers.map(h => `<th>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.rows.map(row => `
                <tr>
                  ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
            ${data.totals ? `
              <tfoot>
                <tr>
                  ${data.totals.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
              </tfoot>
            ` : ''}
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('Failed to export PDF. Please try again.');
  }
}
