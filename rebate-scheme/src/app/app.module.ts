import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersCsvComponent } from './orders-csv/orders-csv.component';
import { PlaceOrdersComponent } from './place-orders/place-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersCsvComponent,
    PlaceOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
