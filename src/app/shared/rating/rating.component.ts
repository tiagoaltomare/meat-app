import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>();
  rates: number[] = [1, 2, 3, 4, 5];
  rate = 0;

  previousRate: number;

  constructor() { }

  ngOnInit() {
  }

  setRate(rat: number) {
    this.rate = rat;
    this.previousRate = undefined;
    this.rated.emit(this.rate);
  }

  setTemporaryRate(rat: number) {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate;
    }
    this.rate = rat;
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

}
