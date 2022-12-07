import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import config from '../utils/config';
import useGameStore from '../utils/store';
import NumberTile from './NumberTile';

const Grid: FC = () => {
  const tiles = useGameStore(store => store.numberTiles);

  return (
    <Box pos="relative">
      {Array(config.size)
        .fill(null)
        .map((_, rowIndex) => (
          <Flex key={rowIndex}>
            {Array(config.size)
              .fill(null)
              .map((_, colIndex) => (
                <Box
                  key={`${rowIndex}-${colIndex}`}
                  w="75px"
                  h="75px"
                  bg="gray.400"
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
