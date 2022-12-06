import { Grid, GridPosition } from '../types';

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
      if (value === null) emptyPositions.push({ row, col });
    });
  });

  return emptyPositions;
};

export const pickRandomEmptyPosition = (grid: Grid) => {
  const emptyPositions = getGridEmptyPositions(grid);

  return getRandomFromArray(emptyPositions) as GridPosition;
};

export const generateGrid = (size: number) => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
};
