import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[realMask]',
  standalone: true
})
export class RealMaskDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.nativeElement.value || '';

    // Remove tudo que não é número
    value = value.replace(/\D/g, '');

    // Divide por 100 para casas decimais
    const numericValue = (parseFloat(value) / 100).toFixed(2);

    // Atualiza o input formatado
    this.el.nativeElement.value = this.formatReal(numericValue);

    // Atualiza o FormControl com número real
    this.control.control?.setValue(parseFloat(numericValue), { emitEvent: false });
  }

  private formatReal(value: string): string {
    const parts = value.split('.');
    let integer = parts[0];
    const decimal = parts[1];

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${integer},${decimal}`;
  }
}