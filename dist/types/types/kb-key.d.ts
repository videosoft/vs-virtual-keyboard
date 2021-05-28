export default interface KeyboardKey {
    symbol: string;
    normalizable?: boolean;
    variations?: Array<KeyboardKey>;
    base64Icon?: string;
    layoutShift?: string;
    autoToggleVariation?: boolean;
    action?: Function;
}
