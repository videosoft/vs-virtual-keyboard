

export default interface KeyboardKey {
  symbol: string;
  normalizable?: boolean;
  variations?: Array<{mode: string; key: KeyboardKey}>;
  base64Icon?: string;
  layoutShift?: number;
  autoToggleVariation?: boolean;
}
