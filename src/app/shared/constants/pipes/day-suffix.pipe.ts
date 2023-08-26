import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'daySuffix' })
export class DaySuffixPipe implements PipeTransform {
  transform(day: number): string {
    if (day >= 11 && day <= 13) {
      return day + 'th';
    }
    switch (day % 10) {
      case 1:
        return day + 'st';
      case 2:
        return day + 'nd';
      case 3:
        return day + 'rd';
      default:
        return day + 'th';
    }
  }
}
