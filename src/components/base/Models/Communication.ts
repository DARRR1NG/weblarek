import { IOrderResponse, IProductResponse } from "../../../types";
import { Api } from "../Api";

export class Communication extends Api {
  constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IProductResponse> {
        return this.get('/product/');
    }

    postData(order: IOrderResponse): Promise<IOrderResponse> {
        return this.post('/order/', order);
    }
}
