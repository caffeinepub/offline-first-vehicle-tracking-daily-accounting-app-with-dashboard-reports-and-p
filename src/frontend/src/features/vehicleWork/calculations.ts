// Pure helpers for working hours and payment calculations

export function calculateWorkingHours(startTime: string, endTime: string): number {
  if (!startTime || !endTime) return 0;

  try {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    let diffMinutes = endMinutes - startMinutes;
    
    // Handle overnight work
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }

    const hours = diffMinutes / 60;
    return Math.max(0, hours);
  } catch {
    return 0;
  }
}

export function calculatePayment(hours: number, hourlyRate: number): number {
  if (isNaN(hours) || isNaN(hourlyRate) || hours < 0 || hourlyRate < 0) {
    return 0;
  }
  return hours * hourlyRate;
}
