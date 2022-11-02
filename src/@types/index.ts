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
  payedPrice?: number;
  id?: string;
};

export type ParsedAnalysisProduct = {
  name: string;
  weight: number;
  percentageAfterBoning: string;
  priceChargedByFrig: string;
  realKgPriceChargedBy: string;
  realPricePayedToFrig: string;
  markup: string;
  markdown: string;
  invoicing: string;
  contributionPercentage: string;
  price: string;
  payedPrice: string;
  breakPercentage: string;
  residuary: number;
  realKgPayedToFrig: number;
  realTotalKgPayedToFrig: number;
  contributionValue: string;
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

export type Cost = {
  id: string;
  value: number;
  type: string;
  name: string;
};
