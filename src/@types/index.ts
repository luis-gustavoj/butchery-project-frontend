export type ProductType = {
  name: string;
  category: string;
  type?: string;
};

export type ProductsType = {
  [category: string]:
    | [
        {
          name: string;
          type: string | null;
        }
      ]
    | [];
};
