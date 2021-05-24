import KeyboardKey from "../types/kb-key";
import KeyboardState from "../types/kb-state";
declare const _default: (state: KeyboardState, params: any) => {
    layoutName?: string | undefined;
    layout?: KeyboardKey[][] | undefined;
    mode?: string | undefined;
    input?: any;
    config?: import("../types/kb-config").default | undefined;
};
export default _default;
