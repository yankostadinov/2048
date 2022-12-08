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
  /** Marks a tile for destruction before next move starts. */
  destroy?: boolean;
  /** Used to stop tiles from chaining updates.
   * @example
   * X-X-2-2-4 -> X-X-X-4-4 instead of X-X-2-2-4 -> X-X-X-X-8
   */
  upgradedThisTurn?: boolean;
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
