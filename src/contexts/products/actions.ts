import { ProductType } from "src/@types";

// Actions types
export const ADD_PRODUCT = "APP/PRODUCTS/ADD_PRODUCT";

// Actions
export const addProduct = (product: ProductType) => ({
  type: ADD_PRODUCT,
  payload: { product },
});
