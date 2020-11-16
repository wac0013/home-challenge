import { TypePromo } from './typePromo';

export interface TypePromotion {
    id: string;
    type: TypePromo;
    required_qty: number;
    price: number;
}

export class Promotion implements TypePromotion {

    readonly id: string = '';
    type: TypePromo = TypePromo.QTY_BASED_PRICE_OVERRIDE;
    required_qty: number = 0;
    price: number = 0;

    constructor(promo: TypePromotion) {
        Object.assign(this, promo);
    }
}