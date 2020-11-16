<template>
  <div style="margin-top: 10px;" class="p-grid">
    <span class="p-col-2">{{ zerofilled(item.position) }}</span>
    <span class="p-col-4">{{ item.product.id }}</span>
    <span class="p-col-6">{{ item.product.name }}</span>
    <span class="p-col-12" style="margin-top: -10px;">
      <span>{{ item.qtd }} x {{ item.product.price }}</span>
      <span v-if="getDiscount()"> - {{ getDiscount() }} </span>
      <span> = £{{ getValueProduct() }} </span>
    </span>
  </div>
</template>

<script lang="ts">

import { RowItem } from "@/models/rowItem";
import { ValidateValuePromo } from "@/services/validateValuePromo";
import { ValidateValuePromoQtd } from "@/services/imp/validateValuePromoQtd";
import { Vue } from "vue-class-component";

class ProductViewProps {
  item!: RowItem;
}

export default class ProductView extends Vue.props(ProductViewProps) {
  private calcValueDiscount: ValidateValuePromo = new ValidateValuePromoQtd();

  zerofilled(value: number) {
    return ("000" + value).slice(-3);
  }

  getDiscount(): number {
    return this.calcValueDiscount.getDiscountProduct(this.item);
  }

  getValueProduct(): number {
    return this.calcValueDiscount.getValueProduct(this.item);
  }

  getTotal(): number {
    if (this.item.product) {
      return this.item.qtd * this.item.product.price;
    } else {
      return 0;
    }
  }

  getTotalWithDiscount() {
    return this.calcValueDiscount.getValueProduct(this.item);
  }
}
</script>
