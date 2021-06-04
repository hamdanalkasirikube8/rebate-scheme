import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersCsvComponent } from './orders-csv/orders-csv.component';


import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrderResultsViewComponent } from './order-results-view/order-results-view.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersCsvComponent,
    OrderResultsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatCardModule, MatPaginatorModule, MatTableModule, MatSortModule, NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
