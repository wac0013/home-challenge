import { TypeRowItem } from "@/models/rowItem";
import { createStore } from "vuex";

export enum TypeActions {
  ADD = "add"
}

export default createStore({
  state: {
    listItens: Array<TypeRowItem>(),
    listProducts: Array<TypeRowItem>()
  },
  mutations: {
    add(state, newItem: TypeRowItem) {
      const index: number = state.listItens.findIndex(
        item => newItem.product?.id == item.product?.id
      );

      newItem.position = state.listProducts.length;
      state.listProducts.push(newItem);

      if (index >= 0) {
        state.listItens[index].qtd = state.listItens[index].qtd + newItem.qtd;
      } else {
        state.listItens.push(newItem);
      }
    }
  },
  actions: {
    add(context, newIten) {
      context.commit(TypeActions.ADD, newIten);
    }
  },
  modules: {}
});
