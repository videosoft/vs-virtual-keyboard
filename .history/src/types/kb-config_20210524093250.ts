

export default interface KeyboardConfig {
  wrpClass?: string;
  layouts?: { defaultLayout: string; keys: Array<{name: string; rows: Array<Array<any>>}> };
  onKeyUp?: Function;
  onKeyDown?: Function;
  onChange?: Function;
}
