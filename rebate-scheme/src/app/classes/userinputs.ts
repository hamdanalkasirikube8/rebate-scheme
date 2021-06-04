export class UserInput {
    orderNo: number;
    organ: String;
    cash: number;
    price: number;
    bonus_ratio: number;

    constructor(orderNo: number, organ: String, cash: number, price: number, bonus_ratio: number) {
        this.orderNo = orderNo;
        this.organ = organ;
        this.cash = cash;
        this.price = price;
        this.bonus_ratio = bonus_ratio;
    }
}