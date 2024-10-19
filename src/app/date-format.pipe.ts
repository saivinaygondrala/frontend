import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, format: string = 'yyyy-MM-dd HH:mm'): string {
    const date = new Date(value);

    // Ensure that the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Set to true for 12-hour format
    };

    // Format the date to a string based on the options
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
  }
}
