import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  content = 'Welcome do Meat App!';

  constructor() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }
}
