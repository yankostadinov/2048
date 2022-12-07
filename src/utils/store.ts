import create from 'zustand';
import {
  findClosestTileToMoveTo,
  generateGrid,
  getGridEmptyPositions,
  getRandomInt,
  pickRandomFromArray,
} from './helpers';
import {
  GameStatus,
  Grid,
  GridPosition,
  MoveDirection,
  NonNumberTiles,
  NumberTiles,
  TileData,
} from '../types';
import config from './config';

interface GameState {
  gameStatus: GameStatus;
  grid: Grid;
  numberTiles: NumberTiles;
  startGame: () => void;
  addNewTile: () => void;
  move: (direction: MoveDirection) => void;
  clearCombinedTiles: () => void;
}

const useGameStore = create<GameState>((set, get) => ({
  gameStatus: GameStatus.INITIAL,
  grid: [],
  numberTiles: new Map(),
  startGame: () => {
    set(() => ({ grid: generateGrid(config.size), numberTiles: new Map() }));
    get().addNewTile();
    get().addNewTile();
    get().addNewTile();
  },
  addNewTile: () =>
    set(state => {
      const grid = [...state.grid];
      const numberTiles = new Map(state.numberTiles);
      const emptyPositions = getGridEmptyPositions(grid);
      const emptyPosition = pickRandomFromArray(emptyPositions) as GridPosition;
      const newTile: TileData = {
        ...emptyPosition,
        id: crypto.randomUUID(),
        power: getRandomInt(1, 3),
      };

      grid[emptyPosition.row][emptyPosition.col] = newTile.id;
      numberTiles.set(newTile.id, newTile);

      const gridIsFull = numberTiles.size === Math.pow(config.size, 2);

      return {
        grid,
        numberTiles,
        gameStatus: gridIsFull ? GameStatus.LOSE : GameStatus.IN_PROGRESS,
      };
    }),
  move: (direction: MoveDirection) => {
    get().clearCombinedTiles();
    set(state => {
      const grid = [...state.grid];
      const numberTiles = new Map(state.numberTiles);
      let gameWon = false;

      if ([MoveDirection.LEFT, MoveDirection.RIGHT].includes(direction)) {
        for (let row = 0; row < grid.length; row++) {
          const currentRow = grid[row];
          // start from second column or second-to-last column since those aren't going to move
          const startingCol =
            direction === MoveDirection.LEFT ? 1 : grid.length - 2;
          const deltaCol = direction === MoveDirection.LEFT ? -1 : 1;
          let columnsChecked = 0;

          for (
            let col = startingCol;
            // skip checking the column closest to the wall, since it's not going to move
            columnsChecked < currentRow.length - 1;
            col -= deltaCol, columnsChecked++
          ) {
            const tile = currentRow[col];

            if (tile === NonNumberTiles.EMPTY) continue;
            if (tile === NonNumberTiles.OBSTACLE) continue;
            const numberTile = numberTiles.get(tile) as TileData;

            const columnToMoveTo = findClosestTileToMoveTo(
              currentRow,
              numberTiles,
              numberTile.col,
              deltaCol,
            );
            numberTile.col = columnToMoveTo;
            currentRow[col] = NonNumberTiles.EMPTY;
            if (typeof currentRow[columnToMoveTo] === 'string') {
              numberTile.destroy = true;
              const tileToUpgrade = numberTiles.get(
                currentRow[columnToMoveTo] as string,
              ) as TileData;
              tileToUpgrade.power += 1;
              if (tileToUpgrade.power === config.targetPower) gameWon = true;
            } else {
              currentRow[columnToMoveTo] = numberTile.id;
            }
          }
        }
      }

      return {
        grid,
        numberTiles,
        gameStatus: gameWon ? GameStatus.WIN : state.gameStatus,
      };
    });
  },
  clearCombinedTiles: () => {
    set(state => {
      const numberTiles = new Map(state.numberTiles);
      numberTiles.forEach(tile => {
        if (tile.destroy) numberTiles.delete(tile.id);
      });

      return { numberTiles };
    });
  },
}));

export default useGameStore;
