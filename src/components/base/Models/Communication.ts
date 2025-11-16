import { IOrderResponse, IProductList } from "../../../types";
import { Api } from "../Api";

export class Communication extends Api {
  constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IProductList> {
        return this.get('/product/');
    }

    postData(order: IOrderResponse): Promise<IOrderResponse> {
        return this.post('/order/', order);
    }
}
