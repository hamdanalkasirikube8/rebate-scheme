import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Result } from '../classes/result';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'order-results-view',
  templateUrl: './order-results-view.component.html',
  styleUrls: ['./order-results-view.component.css']
})
export class OrderResultsViewComponent implements OnInit {

  @Input() resultsArray: Array<Result>;
  orderNo;
  resultTableColumns: string[] = ['organ', 'qty'];
  resultCartArray: Array<Result> = [];
  display: boolean = false;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }


  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.updateView();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    //this.paginator._intl.itemsPerPageLabel = 'Cases per page.';
  }

  updateView() {

    if (this.resultsArray && this.resultsArray.length) {
      this.orderNo = this.resultsArray[0].orderNo;
      this.display = true;
      this.resultCartArray = this.resultsArray;
      this.dataSource.data = this.resultsArray;
      return;
    }
    this.display = false;
  }

}
