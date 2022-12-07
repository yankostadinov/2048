export enum NonNumberTiles {
  EMPTY,
  OBSTACLE,
}
export type TileType = NonNumberTiles.EMPTY | NonNumberTiles.OBSTACLE | TileID;

export interface GridPosition {
  row: number;
  col: number;
}
export type TileID = string;
export interface TileData extends GridPosition {
  id: TileID;
  power: number;
  destroy?: boolean;
}
export type NumberTiles = Map<TileID, TileData>;
export type Grid = Array<Array<TileType>>;

export enum GameStatus {
  INITIAL,
  IN_PROGRESS,
  LOSE,
  WIN,
}

export enum MoveDirection {
  LEFT,
  UP,
  DOWN,
  RIGHT,
}
