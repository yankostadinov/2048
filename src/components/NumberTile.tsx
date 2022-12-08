import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { TileData } from '../types';

interface Props {
  tileData: TileData;
}

const NumberTile: FC<Props> = ({ tileData: { power = 1, col, row } }) => (
  <motion.div
    style={{
      position: 'absolute',
      zIndex: power,
    }}
    initial={{
      scale: 0,
      x: col * 75,
      y: row * 75,
    }}
    animate={{
      scale: power > 1 ? [1, 1.5, 1] : 1,
      x: col * 75,
      y: row * 75,
    }}
    transition={{ duration: 0.3 }}
  >
    <Center
      w="65px"
      h="65px"
      bg="gray.300"
      borderRadius={5}
      m="5px"
      fontSize="20px"
    >
      {Math.pow(2, power)}
    </Center>
  </motion.div>
);

export default NumberTile;
