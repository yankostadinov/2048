import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import useGameStore from '../utils/store';
import NumberTile from './NumberTile';

const Grid: FC = () => {
  const grid = useGameStore(store => store.grid);
  const tiles = useGameStore(store => store.numberTiles);

  return (
    <Box pos="relative">
      {grid.map((rows, rowIndex) => (
        <Flex key={rowIndex}>
          {rows.map((_, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              w="50px"
              h="50px"
              bg="gray.400"
              border="1px solid black"
            />
          ))}
        </Flex>
      ))}
      <Box position="absolute" top="0" left="0">
        {tiles.map(tile => (
          <NumberTile key={`${tile.row}-${tile.col}`} tileData={tile} />
        ))}
      </Box>
    </Box>
  );
};

export default Grid;
