import {
  Grid,
  GridPosition,
  NonNumberTiles,
  NumberTiles,
  TileData,
  TileID,
  TileType,
} from '../types';

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const pickRandomFromArray = (array: Array<any>) => {
  return array[getRandomInt(0, array.length)];
};

export const getGridEmptyPositions = (grid: Grid) => {
  const emptyPositions: GridPosition[] = [];

  grid.forEach((values, row) => {
    values.forEach((value, col) => {
      if (value === NonNumberTiles.EMPTY) emptyPositions.push({ row, col });
    });
  });

  return emptyPositions;
};

export const pickRandomEmptyPosition = (grid: Grid) => {
  const emptyPositions = getGridEmptyPositions(grid);
  return pickRandomFromArray(emptyPositions) as GridPosition;
};

export const generateGrid = (size: number, obstaclesCount: number) => {
  const grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(NonNumberTiles.EMPTY));

  for (let obstacle = 0; obstacle < obstaclesCount; obstacle++) {
    const emptyPosition = pickRandomEmptyPosition(grid);
    grid[emptyPosition.row][emptyPosition.col] = NonNumberTiles.OBSTACLE;
  }

  return grid;
};
export const findClosestTileToMoveTo = (
  tiles: Array<TileType>,
  numberTiles: NumberTiles,
  movingTilePosition: number,
  direction: -1 | 1,
) => {
  const numberTileToMove = numberTiles.get(
    tiles[movingTilePosition] as TileID,
  ) as TileData;
  let tilePositionToMoveTo = movingTilePosition;
  const breakTilePositionLeft = direction === 1 ? 0 : 1;
  const breakTilePositionRight =
    direction === 1 ? tiles.length - 2 : tiles.length - 1;

  while (
    tilePositionToMoveTo >= breakTilePositionLeft &&
    tilePositionToMoveTo <= breakTilePositionRight
  ) {
    const nextTile = tiles[tilePositionToMoveTo + direction];
    if (nextTile === NonNumberTiles.OBSTACLE) break;
    else if (nextTile === NonNumberTiles.EMPTY)
      tilePositionToMoveTo += direction;
    else {
      const nextNumberTile = numberTiles.get(nextTile) as TileData;
      if (
        nextNumberTile.power !== numberTileToMove.power ||
        nextNumberTile.upgradedThisTurn
      )
        break;
      tilePositionToMoveTo += direction;
    }
  }

  return tilePositionToMoveTo;
};
