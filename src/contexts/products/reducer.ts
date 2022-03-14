import { ProductType, ProductsType } from "src/@types";
import { ADD_PRODUCT, EDIT_PRODUCT } from "./actions";

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
            id: String(Math.random().toString(16).slice(2)),
          },
        ],
      } as ProductsType;
    case EDIT_PRODUCT:
      const newProductsCategoryArray = state[payload.product.category].map(
        (product) => {
          if (product.id === payload.product.id) {
            return {
              name: payload.product.name,
              type: payload.product.type,
              id: product.id,
            };
          } else {
            return { ...product };
          }
        }
      );

      return {
        ...state,
        [payload.product.category]: newProductsCategoryArray,
      } as ProductsType;
  }
};
