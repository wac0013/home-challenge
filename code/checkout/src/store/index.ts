import { TypeRowItem } from "@/models/rowItem";
import { createStore } from "vuex";

export enum TypeActions {
  ADD = "add"
}

export interface State {
  listItens: TypeRowItem[];
}

export default createStore<State>({
  state: {
    listItens: []
  },
  mutations: {
    [TypeActions.ADD](state: State, newItem: TypeRowItem) {
      
      newItem.position = state.listItens.length;
      state.listItens.push(newItem);
    }
  },
  actions: {
    [TypeActions.ADD](context, newIten) {
      context.commit(TypeActions.ADD, newIten);
    }
  },
  getters: {
    getListResume(state: State): TypeRowItem[] {
      const resume: TypeRowItem[] = [];

      state.listItens.forEach(it => {
        const index: number = resume.findIndex(
          item => it.product?.id == item.product?.id
        );

        if (index >= 0) {
          resume[index].qtd += it.qtd;
        } else {
          resume.push(it);
        }
      });

      return resume;
    }
  },
  modules: {}
});
