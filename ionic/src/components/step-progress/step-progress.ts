import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step-progress',
  templateUrl: 'step-progress.html',

})
export class StepProgressComponent implements OnInit {
  @Input() step: number;
  @Input() steps: number;

  dummyArray = [];
  constructor() {

  }
  ngOnInit() {
    for(let i=0; i < this.steps; i++) {
      this.dummyArray.push(i);
    }
  }
}
