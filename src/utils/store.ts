import create from 'zustand';
import {
  GameStatus,
  Grid,
  MoveDirection,
  NonNumberTiles,
  NumberTiles,
  TileData,
} from '../types';
import config from './config';
import {
  findClosestTileToMoveTo,
  generateGrid,
  pickRandomEmptyPosition,
} from './helpers';

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
      const emptyPosition = pickRandomEmptyPosition(grid);
      const newTile: TileData = {
        ...emptyPosition,
        id: crypto.randomUUID(),
        power: 1,
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
          // start from second column or second-to-last column since those aren't going to move
          const startingCol =
            direction === MoveDirection.LEFT ? 1 : grid.length - 2;
          const deltaCol = direction === MoveDirection.LEFT ? -1 : 1;
          let columnsChecked = 0;

          for (
            let col = startingCol;
            // skip checking the column closest to the wall, since it's not going to move
            columnsChecked < grid.length - 1;
            col -= deltaCol, columnsChecked++
          ) {
            const tile = grid[row][col];

            if (tile === NonNumberTiles.EMPTY) continue;
            if (tile === NonNumberTiles.OBSTACLE) continue;
            const numberTile = numberTiles.get(tile) as TileData;

            const currentRow = grid[row];
            const columnToMoveTo = findClosestTileToMoveTo(
              currentRow,
              numberTiles,
              numberTile.col,
              deltaCol,
            );
            // combining with other tile already in this spot
            if (typeof grid[row][columnToMoveTo] === 'string') {
              // mark other tile for destruction
              const otherTileInSpot = numberTiles.get(
                grid[row][columnToMoveTo] as string,
              ) as TileData;

              if (otherTileInSpot.id === numberTile.id) continue;

              otherTileInSpot.destroy = true;

              // upgrade current tile and mark game as won if target power of 2 reached
              numberTile.power += 1;
              numberTile.upgradedThisTurn = true;
              if (numberTile.power === config.targetPower) gameWon = true;
            }

            numberTile.col = columnToMoveTo;
            grid[row][col] = NonNumberTiles.EMPTY;
            grid[row][columnToMoveTo] = numberTile.id;
          }
        }
      } else if ([MoveDirection.UP, MoveDirection.DOWN].includes(direction)) {
        for (let col = 0; col < grid.length; col++) {
          // start from second row or second-to-last row since those aren't going to move
          const startingRow =
            direction === MoveDirection.UP ? 1 : grid.length - 2;
          const deltaRow = direction === MoveDirection.UP ? -1 : 1;
          let rowsChecked = 0;

          for (
            let row = startingRow;
            // skip checking the last row because it's closest to the respective wall - it's not going to move
            rowsChecked < grid.length - 1;
            row -= deltaRow, rowsChecked++
          ) {
            const tile = grid[row][col];

            if (tile === NonNumberTiles.EMPTY) continue;
            if (tile === NonNumberTiles.OBSTACLE) continue;

            const numberTile = numberTiles.get(tile) as TileData;

            const currentCol = grid.map(row => row[col]);
            const rowToMoveTo = findClosestTileToMoveTo(
              currentCol,
              numberTiles,
              numberTile.row,
              deltaRow,
            );
            // combining with other tile already in this spot
            if (typeof grid[rowToMoveTo][col] === 'string') {
              // mark other tile for destruction
              const otherTileInSpot = numberTiles.get(
                grid[rowToMoveTo][col] as string,
              ) as TileData;

              if (otherTileInSpot.id === numberTile.id) continue;

              otherTileInSpot.destroy = true;


              // upgrade current tile and mark game as won if target power of 2 reached
              numberTile.power += 1;
              numberTile.upgradedThisTurn = true;
              if (numberTile.power === config.targetPower) gameWon = true;
            }

            numberTile.row = rowToMoveTo;
            grid[row][col] = NonNumberTiles.EMPTY;
            grid[rowToMoveTo][col] = numberTile.id;
          }
        }
      }

      return {
        grid,
        numberTiles,
        gameStatus: gameWon ? GameStatus.WIN : state.gameStatus,
      };
    });
    if (get().gameStatus !== GameStatus.WIN) get().addNewTile();
  },
  clearCombinedTiles: () => {
    set(state => {
      const numberTiles = new Map(state.numberTiles);
      numberTiles.forEach(tile => {
        if (tile.destroy) console.log('col ', tile.col, ' row ', tile.row);
        if (tile.destroy) numberTiles.delete(tile.id);
        else if (tile.upgradedThisTurn) tile.upgradedThisTurn = false;
      });

      return { numberTiles };
    });
  },
}));

export default useGameStore;
