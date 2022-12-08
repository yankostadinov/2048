interface GameConfig {
  /** The square grid size. Size 6 creates a grid with 6 rows and 6 columns for a total of 36 tiles.*/
  size: number;
  /** Number of obstacles placed on the grid to increase difficulty by blocking the movement of tiles. */
  obstacles: number;
  /** The power of 2 that you must reach to win the game. A targetPower of 11 means you need to create a tile of value 2048.*/
  targetPower: number;
  /** Disables keyboard arrow shortcuts to move the tiles. */
  keyboardShortcutsEnabled: boolean;
}

const config: GameConfig = {
  size: 4,
  obstacles: 0,
  targetPower: 3,
  keyboardShortcutsEnabled: true,
};

export default config;
