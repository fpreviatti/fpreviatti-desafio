import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'real'
})
export class RealPipe implements PipeTransform {

  transform(value: number | string | null | undefined): string {
    if (value == null) return 'R$ 0,00';

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

}