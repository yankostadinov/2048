export type Grid = Array<Array<number>>;
interface GridPosition {
  row: number;
  col: number;
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const getRandomFromArray = (array: Array<any>) => {
  return array[getRandomInt(0, array.length)];
};

export const getGridEmptyPositions = (grid: Grid) => {
  const emptyPositions: GridPosition[] = [];

  grid.forEach((values, row) => {
    values.forEach((value, col) => {
      if (value === 0) emptyPositions.push({ row, col });
    });
  });

  return emptyPositions;
};

export const checkGridHasAnyEmptyPositions = (grid: Grid) => {
  return getGridEmptyPositions(grid).length !== 0;
};

export const pickRandomPositionInGrid = (grid: Grid) => {
  return {
    row: getRandomInt(0, grid.length),
    col: getRandomInt(0, grid[0].length),
  } as GridPosition;
};

export const pickRandomEmptyPosition = (grid: Grid) => {
  const emptyPositions = getGridEmptyPositions(grid);

  return getRandomFromArray(emptyPositions);
};

export const generateGrid = (size: number) => {
  const grid = Array<number>(size)
    .fill(0)
    .map(() => Array<number>(size).fill(0));
  const startingPosition = pickRandomPositionInGrid(grid);

  console.error(startingPosition);
  grid[startingPosition.row][startingPosition.col] = 2;

  return grid;
};
