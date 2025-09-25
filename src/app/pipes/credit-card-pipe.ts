import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length !== 16) {
      return value;
    }

    // Format: "1234567890123456" -> "1234 -- 5678 -- 9012 -- 3456"
    return value.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 -- $2 -- $3 -- $4');
  }

}
