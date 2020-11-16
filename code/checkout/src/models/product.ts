import { TypePromotion } from './promotion';
import { TypePromo } from './typePromo';

export interface TypeProduct {
  id: string;
  name: string;
  price: number;
  promotions: TypePromotion[]
}

export class Product implements TypeProduct {
  readonly id = "";
  name = "";
  price = 0;
  promotions: TypePromotion[] = [];

  constructor(prod: TypeProduct) {
    Object.assign(this, prod);
  }
}