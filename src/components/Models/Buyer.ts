import { IBuyer, TBuyerErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    buyerInfo: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: ""
    }

    constructor(protected events: IEvents) {}

    // Сохранение данных в модели
    saveData(data: Partial<IBuyer>): void {
        Object.assign(this.buyerInfo, data);
        this.events.emit('dataBuyer:change')
    }
    // Получение всех данных покупателя
    getDataBuyer(): IBuyer {
        return this.buyerInfo
    }
    // Очистка данных покупателя
    removeDataBuyer(): void {
        this.buyerInfo = {
            payment: "",
            email: "",
            phone: "",
            address: "",
        };
    }
    // Валидация данных
    validationData(): TBuyerErrors {
        const fault = {
            payment: "",
            email: "",
            phone: "",
            address: "",
        }
        if (this.buyerInfo.address == '') {
            fault.address = 'Не введен адрес'
        }
        if (this.buyerInfo.email == '') {
            fault.email = 'Не введен email'
        }
        if (this.buyerInfo.payment != 'card' && this.buyerInfo.payment != 'cash') {
            fault.payment = 'Не выбран тип оплаты'
        }
        if (this.buyerInfo.phone == '') {
            fault.phone = 'Не введен номер телефона'
        }
        return fault
    }
}