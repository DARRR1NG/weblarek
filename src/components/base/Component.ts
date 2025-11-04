/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
