import { Result } from './../classes/result';
import { OrgansService } from './../services/organs.service';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserInput } from '../classes/userinputs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'orders-csv',
  templateUrl: './orders-csv.component.html',
  styleUrls: ['./orders-csv.component.css']
})

export class OrdersCsvComponent implements OnInit {
  displayedColumns: string[] = ['no', 'organ', 'cash', 'price', 'bonus_ratio'];

  //used to create and pass csv array to app component.
  csvInputArray: UserInput[] = [];
  @Output() sendCSVInputArray = new EventEmitter<any>();
  @Output() resultsArrayEmitter = new EventEmitter<any>();

  @Input() resultsArray: Array<Result> = [];

  displayCSVTable = false;
  displayCSVError = false;
  noValidInputError: boolean;

  resultCartArray: Array<Result> = [];

  displayResultView = false;

  constructor(private organService: OrgansService) { }

  dataSource = new MatTableDataSource();
  selection = new SelectionModel<UserInput>(false, []);
  // @ViewChild(MatSort) sort: MatSort;
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

  ngOnInit() {
    this.dataSource.data = [];

  }

  ngOnChanges(changes: SimpleChanges) {
  }

  readCSVFile(files: FileList) {
    this.displayCSVError = false;
    this.noValidInputError = false

    let file: File = files.item(0);

    if (files && files.length && file.size == 0) {
      //File size error
      //console.log('error: ' + file.size);
      this.displayCSVError = true;
      this.csvInputArray = [];
      this.sendCSVInputArray.emit(this.csvInputArray);
      this.dataSource.data = [];
      this.displayCSVTable = false;
      this.resultsArray = [];
      return;
    }

    if (files && files.length && file.size > 0) {
      this.resultsArray = [];
      let testArray: Array<UserInput> = [];
      // Give msg when invalid inputs check if array is empty after process
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;
        let csvToRowArray = csv.split(/\r|\n|\r/);
        let order = 1;
        for (let index = 1; index < csvToRowArray.length; index++) {
          let row = csvToRowArray[index].split(",");
          let organ = row[0].substring(1, row[0].length - 1);
          let cash = parseInt(row[1]);
          let price = parseInt(row[2]);
          let bonus_ratio = parseInt(row[3], 5);

          let availableOrgans = this.organService.getOrganNames();
          let validOrgan: boolean;

          for (const i in availableOrgans) {
            if (organ === availableOrgans[i]) {
              validOrgan = true;
              break;
            }
          }
          //valid input fields
          if (validOrgan && this.isNumeric(row[1]) && this.isNumeric(row[2]) && this.isNumeric(row[3])) {
            testArray.push(new UserInput(order++, organ, cash, price, bonus_ratio));
          }

        }
        // all inputs in the csv file 
        this.csvInputArray = testArray;
        //console.log("Inputs->>>>", JSON.stringify(this.csvInputArray));

        this.sendCSVInputArray.emit(this.csvInputArray);
        this.dataSource.data = this.csvInputArray;

        this.displayCSVTable = true;
        if (this.csvInputArray.length == 0) {
          this.displayCSVTable = false;
          this.noValidInputError = true;
          //this.csvInputArray = [];
          this.dataSource.data = [];
          this.displayCSVTable = false;
          //console.log('Error: no valid input found');
        }
      }

    }
  }

  isNumeric(value) {
    return /^\d+$/.test(value);
  }

  rowClicked(row) {
    let orderNo = row.orderNo;
    if (this.resultsArray.length > 0) {
      this.displayResultCart(orderNo);
      this.displayResultView = true;
      return;
    }
    alert("Process orders first to view the results!");
  }

  displayResultCart(orderNo) {
    let array: Array<Result> = [];
    for (const key in this.resultsArray) {
      let resultArray = this.resultsArray[key];
      for (const j in resultArray) {
        let orderNoResultArray = resultArray[j].orderNo;
        if (orderNo == orderNoResultArray) {
          array.push(new Result(orderNoResultArray, resultArray[j].organ, resultArray[j].qty));
        }
      }
      this.resultCartArray = array;
      this.resultsArrayEmitter.emit(this.resultCartArray);
      // this.displayResultTable = true;
    }
  }


}
