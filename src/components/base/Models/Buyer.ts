import { IBuyer, IValidation } from "../../../types";

export class Buyer {
    BuyerInfo: IBuyer = {
        payment: "",
        email: "",
        phone: "",
        address: "",
    }
    // Сохранение данных в модели
    saveData(data: IBuyer): void {
        this.BuyerInfo.email = data.email,
        this.BuyerInfo.address = data.address,
        this.BuyerInfo.phone = data.phone,
        this.BuyerInfo.payment = data.payment
    }
    // Получение всех данных покупателя
    getDataBuyer(): IBuyer {
        return this.BuyerInfo
    }
    // Очистка данных покупателя
    removeDataBuyer(): void {
        this.BuyerInfo = {
            payment: "",
            email: "",
            phone: "",
            address: "",
        };
    }
    // Валидация данных
    validationData(): IValidation {
        const fault = {
            payment: "",
            email: "",
            phone: "",
            address: "",
        }
        if (this.BuyerInfo.address == '') {
            fault.address = 'Не введен адрес'
        }
        if (this.BuyerInfo.email == '') {
            fault.email = 'Не введен email'
        }
        if (this.BuyerInfo.payment != 'card' && this.BuyerInfo.payment != 'cash' && this.BuyerInfo.payment != '') {
            fault.payment = 'Не выбран тип оплаты'
        }
        if (this.BuyerInfo.phone == '') {
            fault.phone = 'Не введен номер телефона'
        }
        return fault
    }
}