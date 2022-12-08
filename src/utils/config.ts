import type { ColorProps } from '@chakra-ui/react';

interface GameConfig {
  /** The square grid size. Size 6 creates a grid with 6 rows and 6 columns for a total of 36 tiles.*/
  size: number;
  /** Number of obstacles placed on the grid to increase difficulty by blocking the movement of tiles. */
  obstacles: number;
  /** The power of 2 that you must reach to win the game. A targetPower of 11 means you need to create a tile of value 2048.*/
  targetPower: number;
  /** Disables keyboard arrow shortcuts to move the tiles. */
  keyboardShortcutsEnabled: boolean;
  /** Colors for different powers of tiles. Make sure to add more colors if increasing the targetPower. */
  powerColors: ColorProps['color'][];
}

const config: GameConfig = {
  size: 6,
  obstacles: 0,
  targetPower: 11,
  keyboardShortcutsEnabled: true,
  powerColors: [
    'gray.800',
    'gray.200',
    'green.300',
    'green.400',
    'green.600',
    'blue.300',
    'blue.500',
    'blue.700',
    'yellow.300',
    'yellow.500',
    'yellow.700',
    'red.400',
  ],
};

export default config;
