export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProductList {
  total: number,
  items: IProduct[]
}

export type paymentType = 'card' | 'cash' | ''

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IBuyer {
  payment: paymentType,
  email: string,
  phone: string,
  address: string,
}

export interface IOrderResponse extends IBuyer {
    total: number,
    items: string[]
}

export interface IOrderPostResponse {
  id: string[],
  total: number
}