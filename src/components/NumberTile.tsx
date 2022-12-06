import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { TileData } from '../types';

interface Props {
  tileData: TileData;
}

const NumberTile: FC<Props> = ({ tileData: { power = 1, col, row } }) => {
  return (
    <Center
      pos="absolute"
      data-row={row}
      data-col={col}
      left={`${col * 50 + 2}px`}
      top={`${row * 50 + 2}px`}
      w="46px"
      h="46px"
      bg="gray.300"
      borderRadius={5}>
      {Math.pow(2, power)}
    </Center>
  );
};

export default NumberTile;
