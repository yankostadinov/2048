import create from 'zustand';
import { generateGrid, pickRandomEmptyPosition } from '.';
import { Grid, TileData } from '../types';

interface GameState {
  grid: Grid;
  numberTiles: TileData[];
  startGame: (size: number) => void;
  addNewTile: () => void;
  gameState: {
    value: 'NOT_STARTED' | 'IN_PROGRESS' | 'OVER';
  };
}

const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  numberTiles: [],
  startGame: size => {
    set(() => {
      const grid = generateGrid(size);

      return { grid, numberTiles: [] };
    });
    get().addNewTile();
  },
  addNewTile: () =>
    set(state => {
      const grid = [...state.grid];
      const emptyPosition = pickRandomEmptyPosition(grid);
      const newTile = { ...emptyPosition, power: 1 };

      grid[emptyPosition.row][emptyPosition.col] = newTile;
      const numberTiles = state.numberTiles.concat(newTile);

      return { grid, numberTiles };
    }),
  gameState: {
    get value() {
      const { grid, numberTiles } = get();

      if (numberTiles.length === 0) return 'NOT_STARTED';
      else if (numberTiles.length === grid.length * grid.length) return 'OVER';
      else return 'IN_PROGRESS';
    },
  },
}));

export default useGameStore;
