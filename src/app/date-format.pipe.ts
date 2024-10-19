import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, format: string = 'yyyy-MM-dd'): string {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }

}
