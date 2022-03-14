import { ProductType } from "src/@types";

// Actions types
export const ADD_PRODUCT = "APP/PRODUCTS/ADD_PRODUCT";
export const EDIT_PRODUCT = "APP/PRODUCTS/EDIT_PRODUCT";

// Actions
export const addProduct = (product: ProductType) => ({
  type: ADD_PRODUCT,
  payload: { product },
});

export const editProduct = (product: ProductType) => ({
  type: EDIT_PRODUCT,
  payload: { product },
});
