import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpanToDate'
})
export class TimeSpanToDatePipe implements PipeTransform {

  transform(value: string, format: string = 'short'): string {
    if (!value) return '';

    // Extraire le timestamp entre les parenthèses
    const timestampMatch = value.match(/\/Date\((\d+)\)\//);
    if (!timestampMatch) return 'Invalid Date';

    const timestamp = parseInt(timestampMatch[1], 10);
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }}
