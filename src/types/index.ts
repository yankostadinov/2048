export interface GridPosition {
  row: number;
  col: number;
}
export interface TileData extends GridPosition {
  power: number;
}
export type Grid = Array<Array<TileData | null>>;
