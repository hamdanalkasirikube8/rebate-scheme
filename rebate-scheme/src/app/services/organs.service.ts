import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrgansService {
  inventory: Object = [
    {
      'organ': 'heart',
      'schemeDetails': {
        'bonus_ratio': 3,
        'freeOrgansScheme': [
          { 'organ': 'heart', 'qty': 1 }
        ]
      }
    },
    {
      'organ': 'liver',
      'schemeDetails': {
        'bonus_ratio': 2,
        'freeOrgansScheme': [
          { 'organ': 'lung', 'qty': 1 }
        ]
      }
    },
    {
      'organ': 'lung',
      'schemeDetails': {
        'bonus_ratio': 4,
        'freeOrgansScheme': [
          { 'organ': 'heart', 'qty': 1 },
          { 'organ': 'liver', 'qty': 1 }
        ]
      }
    }
  ];
  constructor() { }

  getInventory() {
    return this.inventory;
  }

  getOrganNames() {
    let availableOrgansList = [];
    for (const i in this.inventory) {
      let organ = this.inventory[i].organ;
      availableOrgansList.push(organ);
    }
    return availableOrgansList;
  }

}
