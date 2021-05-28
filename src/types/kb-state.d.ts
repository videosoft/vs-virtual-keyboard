import KeyboardKey from "./kb-key";
export default interface KeyboardState {
    layout?: Array<Array<KeyboardKey>>;
    mode?: string;
    input?: any;
}
