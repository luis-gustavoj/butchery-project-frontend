export type ProductType = {
  name: string;
  category: string;
  type?: string;
  id?: string;
};

export type ProductsType = {
  [category: string]:
    | [
        {
          name: string;
          type: string | null;
          id: string;
        }
      ]
    | [];
};

export type AnalysisProduct = {
  name?: string;
  weight?: number;
  price?: number;
  id?: number;
};
