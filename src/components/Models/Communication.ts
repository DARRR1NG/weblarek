import { IOrderResponse, IProductList, IOrderPostResponse } from "../../types";
import { Api } from "../base/Api";

export class Communication extends Api {
  constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IProductList> {
        return this.get('/product/');
    }

    postData(order: IOrderResponse): Promise<IOrderPostResponse> {
        return this.post('/order/', order);
    }
}
