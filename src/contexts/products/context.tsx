import React, { createContext, useContext, useReducer } from "react";
import { ProductsType } from "src/@types";

// Reducer
import { ActionType, initialState, productsReducer } from "./reducer";

// Types
type ProductsContextProviderProps = {
  children: React.ReactNode;
};

type ProductsContextType = {
  products: ProductsType;
  dispatch: React.Dispatch<ActionType>;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType
);

export const ProductsContextProvider = ({
  children,
}: ProductsContextProviderProps) => {
  const [products, dispatch] = useReducer(productsReducer, initialState);

  return (
    <ProductsContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook for using products context
export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context)
    throw new Error(
      "ProductsContext must be called from within the ProductsContextProvider"
    );

  return context;
};
