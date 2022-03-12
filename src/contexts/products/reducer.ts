import { ProductType, ProductsType } from "src/@types";
import { ADD_PRODUCT } from "./actions";

export type ActionType = {
  type: string;
  payload: {
    product: ProductType;
  };
};

export const initialState: ProductsType = {
  BOV: [],
  SUI: [],
  FRN: [],
  CXA: [],
};

export const productsReducer = (state = initialState, action: ActionType) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        [payload.product.category]: [
          ...state[payload.product.category],
          {
            name: payload.product.name,
            type: payload.product.type,
          },
        ],
      } as ProductsType;
  }
};
