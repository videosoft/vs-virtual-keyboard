export default interface KeyboardConfig {
    wrpClass?: string;
    layouts?: {
        defaultLayout: string;
        layouts: Array<{
            name: string;
            rows: Array<Array<any>>;
            shortcuts?: Array<string>;
        }>;
    };
    onKeyUp?: Function;
    onKeyDown?: Function;
    onChange?: Function;
    modePressedOnTimeout?: number;
    availableInTypes?: Array<string>;
    interceptor?: Function;
}
