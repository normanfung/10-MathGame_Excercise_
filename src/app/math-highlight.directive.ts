import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs';

@Directive({
  selector: '[appMathHighlight]',
})
export class MathHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {
    console.log(el.nativeElement);
  }

  ngOnInit() {
    this.controlName.control?.parent?.valueChanges.subscribe(
      ({ a, b, answer }) => {
        const correctAnswer = a + b;
        this.el.nativeElement.classList.remove('correct');
        if (correctAnswer === +answer) {
          this.el.nativeElement.classList.add('correct');
        }
      }
    );
  }
}
