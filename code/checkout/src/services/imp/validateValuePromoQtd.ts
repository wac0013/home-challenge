import { TypeRowItem } from '@/models/rowItem';
import { TypePromo } from '@/models/typePromo';
import { ValidateValuePromo } from '../validateValuePromo';

export class ValidateValuePromoQtd implements ValidateValuePromo {
  getDiscountProduct(item: TypeRowItem) {
    if (item.product) {
      let discount = 0;

      item.product.promotions
        .filter(promo => promo.type === TypePromo.QTY_BASED_PRICE_OVERRIDE)
        .forEach(promo => {
          if (promo.required_qty <= item.qtd &&
            item.product &&
            (item.product?.price * item.qtd) - ((promo.price * Math.floor(item.qtd / promo.required_qty)) + ((item.qtd % promo.required_qty) * item.product?.price)) > discount
          ) {
            discount = (item.product?.price * item.qtd) - ((promo.price * Math.floor(item.qtd / promo.required_qty)) + ((item.qtd % promo.required_qty) * item.product?.price));
          }
        });

      return discount;
    } else {
      return 0;
    }
  };

  getValueProduct(item: TypeRowItem) {
    return item.product ? item.product.price * item.qtd - this.getDiscountProduct(item): 0;
  };
}