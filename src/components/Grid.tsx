import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { NonNumberTiles } from '../types';
import useGameStore from '../utils/store';
import NumberTile from './NumberTile';

const Grid: FC = () => {
  const grid = useGameStore(store => store.grid);
  const tiles = useGameStore(store => store.numberTiles);

  return (
    <Box pos="relative">
      {grid.map((row, rowIndex) => (
        <Flex key={rowIndex}>
          {row.map((col, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              w="75px"
              h="75px"
              bg={col === NonNumberTiles.OBSTACLE ? 'gray.800' : 'gray.300'}
              border="1px solid black"
            />
          ))}
        </Flex>
      ))}
      <Box position="absolute" top="0" left="0">
        {[...tiles.values()].map(tile => (
          <NumberTile key={tile.id} tileData={tile} />
        ))}
      </Box>
    </Box>
  );
};

export default Grid;
