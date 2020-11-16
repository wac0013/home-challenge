<template>
  <div>
    <form class="p-grid">
      <div class="p-col 12 p-grid">
        <div class="p-field p-col-4">
          <label for="qtd">Quantity</label>
          <InputNumber
            id="qtd"
            v-model="qtdInsert"
            :min="0"
            :max="100"
            showButtons
            inputStyle="max-width: 50px;"
          />
        </div>
        <div class="p-field p-col-8">
          <label for="search">Search Product Id</label>
          <div class="p-inputgroup">
            <InputText
              id="search"
              type="text"
              v-model="search"
              placeholder="Search"
              style="max-width: 150px;"
            />
            <Button
              icon="pi pi-search"
              class="p-button-warning"
              style="height: 54px;"
              @click.prevent="findProductAsync"
            />
          </div>
        </div>
      </div>
    </form>
    <div>
      <div class="p-grid">
        <span style="margin-left: 5px; margin-bottom: 5px">Item</span>
        <span style="margin-left: 5px; margin-bottom: 5px">Code</span>
        <span style="margin-left: 5px; margin-bottom: 5px">Description</span>
        <span style="margin-left: 5px; margin-bottom: 5px">Quantity</span>
        <span style="margin-left: 5px; margin-bottom: 5px">Unit Price</span>
        <span style="margin-left: 5px; margin-bottom: 5px">Discount</span>
      </div>
      <product-view
        v-for="item of listProducts"
        :key="item.position"
        :item="item"
      />
    </div>
    <Button
      label="Checkout"
      class="p-button-success p-button-raised p-button-rounded"
      icon="pi pi-check"
      iconPos="right"
      @click.prevent="goToCheckout()"
      style="height: 54px;"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RowItem } from "@/models/rowItem";
import { IProductConsume } from "@/services/productConsume";
import { ProductConsumeWS } from "@/services/imp/productConsumeWS";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

import ProductView from "@/components/ProductView.vue";
import { Product } from "@/models/product";
import { TypeActions } from "@/store";

@Options({
  components: {
    InputText,
    InputNumber,
    Button,
    ProductView
  }
})
export default class ScanItens extends Vue {
  search = "";
  qtdInsert = 1;
  productService: IProductConsume = new ProductConsumeWS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $toast: any; //necessary, due to bug in vue 3
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $store: any; //necessary, due to bug in vue 3

  get listProducts(): RowItem[] {
    return this.$store.state.listProducts;
  }

  async findProductAsync() {
    let prod: Product | null;
    try {
      prod = await this.productService.getProduct(this.search);

      if (prod) {
        const rowItem = new RowItem({
          position: this.listProducts.length,
          qtd: this.qtdInsert,
          product: prod
        });

        this.$store.dispatch(TypeActions.ADD, rowItem);
      }
    } catch (error) {
      this.$toast.add({
        severity: "error",
        summary: error?.message,
        life: 3000
      });
    }

    this.qtdInsert = 1;
    this.search = "";
  }

  goToCheckout() {
    if (this.$store.state.listItens?.length) {
      this.$router.push("/checkout");
    } else {
      this.$toast.add({
        severity: "info",
        summary: "List itens empty",
        life: 3000
      });
    }
  }
}
</script>
