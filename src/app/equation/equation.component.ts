import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { Validators } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;

  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl('', [
        MathValidators.lessThenEighteen(),
        Validators.required,
      ]),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );
  constructor() {}

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(150),
        scan(
          (acc) => {
            return {
              numberSolved: ++acc.numberSolved,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.get('a')?.value;
  }

  get b() {
    return this.mathForm.get('b')?.value;
  }

  get answer() {
    return this.mathForm.get('answer');
  }
}
