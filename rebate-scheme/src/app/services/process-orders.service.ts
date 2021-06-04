import { OrgansService } from './organs.service';
import { Result } from './../classes/result';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessOrdersService {

  constructor(private organService: OrgansService) { }

  processOrders(csvInputArray) {
    let resultArray: Array<Result> = [];
    let array = [];
    for (const i in csvInputArray) {
      let row = csvInputArray[i];
      //console.log('row: ' + row.organ);

      //Take inputs from csv array
      let organ = row.organ;
      let orderNo = row.orderNo;
      let orderedOrgan = organ;
      //console.log(orderedOrgan);
      let cash = row.cash;
      let price = row.price;
      let br = row.bonus_ratio;

      let purchase = Math.trunc(cash / price);
      let bonus = Math.trunc(purchase / br);
      // console.log('bonus ' + bonus);
      // console.log('purchase: ' + purchase);

      //Calculate rebate free organs
      let getRebateOrgans: Array<Result> = this.getRebateOrgans(orderNo, orderedOrgan, bonus, purchase);
      //console.log('free rebate organs array: ' + JSON.stringify(getRebateOrgans));

      //Generate final cart
      let allOrganArray: Array<Result> = this.getAllOrgans(orderNo, orderedOrgan, purchase, getRebateOrgans);
      array.push(allOrganArray);

    }

    resultArray = array;
    return resultArray;
    //this.dataSourceResult = this.resultArray;

  }


  getRebateOrgans(orderNo, orderedOrgan, bonus, purchase) {
    let freeOrganArray: Array<Result> = [];
    //get inventory
    let inventory = this.organService.getInventory();
    for (const i in inventory) {
      let obj = inventory[i];
      // It matches the ordered organ with the organs available.
      if (obj.organ == orderedOrgan) {
        let schemeDetails: Object = obj.schemeDetails;
        if (schemeDetails.hasOwnProperty('freeOrgansScheme')) {
          let freeOrgansScheme: { organ: string, qty: number }[] = schemeDetails['freeOrgansScheme'];
          //console.log('Ordered Organ: ' + orderedOrgan);
          for (const k in freeOrgansScheme) {
            let rebateOrgan = freeOrgansScheme[k].organ;
            let qty = freeOrgansScheme[k].qty;
            let rbqty = qty * bonus;

            if (rebateOrgan == orderedOrgan) {
              //if ordered organ is same as the rebate organ we sum the quantity
              purchase = purchase + rbqty;
              freeOrganArray.push(new Result(orderNo, rebateOrgan, purchase));
            }

            if (orderedOrgan != rebateOrgan) {
              freeOrganArray.push(new Result(orderNo, rebateOrgan, rbqty));
            }
            // console.log('rebate Organ: ' + rebateOrgan);
            // console.log('rebate qty: ' + rbqty);

          }

        }

      }
    }
    return freeOrganArray;
  }

  getAllOrgans(orderNo, orderedOrgan, purchase, getRebateOrgansArray) {
    let organsInventory = this.organService.getInventory();

    //initialize final all organs array with already created rebate organs array
    let allOrgansArray: Array<Result> = getRebateOrgansArray;
    for (const i in organsInventory) {
      let availableOrgan = organsInventory[i].organ;
      //check if organs in inventory exists in the rebate organs array.
      let organExists = this.organExists(availableOrgan, allOrgansArray);
      // console.log('exist: ' + organExists);
      //if the current organ from the inventory is not present in the rebate organs array and
      //if it is also not the ordered organ then set it's quantity to 0.
      if (!organExists && availableOrgan != orderedOrgan) {
        allOrgansArray.push(new Result(orderNo, availableOrgan, 0));
      }
      //if current organ from inventory does not exists in the rebate organs array and
      //if it is also the ordered organ then set it's quantity to it's purchased quantity.
      if (!organExists && availableOrgan == orderedOrgan) {
        allOrgansArray.push(new Result(orderNo, availableOrgan, purchase));
      }
    }
    return allOrgansArray;
  }

  organExists(organName, allOrgansArray) {
    return allOrgansArray.some(function (el) {
      return el.organ === organName;
    });
  }

}
