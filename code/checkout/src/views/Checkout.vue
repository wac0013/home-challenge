<template>
  <product-view-resume
    v-for="item of listItens"
    :key="item"
    :item="item"
    :showPosition="false"
  />
  <hr />
  <div class="p-grid">
    <div class="p-col-12">Raw Total: £{{ getTotal() }}</div>
    <div class="p-col-12">Total Promos: £{{ getTotalDiscount() }}</div>
    <div class="p-col-12">Total Payable: £{{ getTotal() }}</div>
  </div>
  <Button
    label="Back"
    class="p-button-info p-button-raised p-button-rounded"
    icon="pi pi-arrow-left"
    iconPos="right"
    @click.prevent="back()"
    style="height: 54px;"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import ProductViewResume from "@/components/ProductViewResume.vue";

import Button from "primevue/button";

import { TypeRowItem } from "@/models/rowItem";
import { ValidateValuePromo } from "@/services/validateValuePromo";
import { ValidateValuePromoQtd } from "@/services/imp/validateValuePromoQtd";

@Options({
  components: {
    ProductViewResume,
    Button
  }
})
export default class Checkout extends Vue {
  private calcValueDiscount: ValidateValuePromo = new ValidateValuePromoQtd();
  listItens: TypeRowItem[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $store: any;

  created() {
    this.listItens = this.$store.getters.getListResume;
  }

  getTotal(): number {
    let total = 0;

    this.listItens.forEach(item => {
      total += item.product ? item.qtd * item.product.price : 0;
    });

    return total;
  }

  getTotalDiscount(): number {
    let total = 0;

    this.listItens.forEach(item => {
      total += this.calcValueDiscount.getDiscountProduct(item);
    });

    return total;
  }

  getTotalWithDiscount(): number {
    let total = 0;

    this.listItens.forEach(item => {
      total += this.calcValueDiscount.getValueProduct(item);
    });

    return total;
  }

  back() {
    this.$router.go(-1);
  }
}
</script>
