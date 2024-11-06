import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    const cleaned = ('' + value).replace(/\D/g, '');

    if (cleaned.length !== 11) {
      return value;
    }

    const country = cleaned[0];
    const area = cleaned.slice(1, 4);
    const firstPart = cleaned.slice(4, 7);
    const secondPart = cleaned.slice(7);

    return `+${country} (${area}) ${firstPart}-${secondPart}`;
  }
}
