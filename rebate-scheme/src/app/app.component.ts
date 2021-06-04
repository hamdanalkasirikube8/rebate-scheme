import { ProcessOrdersService } from './services/process-orders.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserInput } from './classes/userinputs';
import { Result } from './classes/result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  csvInputArray: UserInput[] = [];
  passResultsToResultsView;
  ordersProcessedArrayAppComponent;
  displayProcessOrderBtn: boolean = false;
  resultArrayFromAppComponent: Array<Result> = [];
  @Output() finalResultArray = new EventEmitter<any>();
  displayResultsCart = false;

  constructor(private processOrdersService: ProcessOrdersService) {
  }

  //get csv array from order-csv component
  getCSVInputArrayInAppComponent($event) {
    this.csvInputArray = $event;
    if (this.csvInputArray.length) {
      this.displayProcessOrderBtn = true;
      this.passResultsToResultsView = [];
      return;
    }
    this.displayProcessOrderBtn = false;
    this.passResultsToResultsView = [];
  }

  //Getting result array from orders-csv component to pass in to orders-result-view component.
  getResultsArrayInAppComponent($event) {
    this.passResultsToResultsView = $event;
    this.displayResultsCart = true;
  }

  //process orders when button is clicked.
  processOrder() {
    if (this.csvInputArray.length >= 1) {
      this.resultArrayFromAppComponent = this.processOrdersService.processOrders(this.csvInputArray);
      this.finalResultArray.emit(this.resultArrayFromAppComponent);
    }
  }

}
