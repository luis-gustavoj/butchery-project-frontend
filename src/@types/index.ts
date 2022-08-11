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

export type User = {
  address: "";
  city?: string;
  country?: string;
  state?: string;
  zip?: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  orgName: string;
  userType: "user" | "admin";
};
