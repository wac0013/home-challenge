import { Product } from "./product";

export interface TypeRowItem {
  position: number ;
  qtd: number;
  product?: Product;
}

export class RowItem implements TypeRowItem {
    position = 0;
    qtd = 0;
    product: Product | undefined;
    
    constructor(item: TypeRowItem) {
        if (item) Object.assign(this, item);
    }
}