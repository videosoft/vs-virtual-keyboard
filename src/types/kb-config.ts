

export default interface KeyboardConfig {
  wrpClass?: string;
  layouts?: { defaultLayout: string; layouts: Array<{name: string; rows: Array<Array<any>>}> };
  onKeyUp?: Function;
  onKeyDown?: Function;
  onChange?: Function;
  modePressedOnTimeout?: number;
  availableInTypes?: Array<string>;
  interceptor?: Function;
}
