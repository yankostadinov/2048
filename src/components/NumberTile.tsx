import { Box, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { TileData } from '../types';

interface Props {
  tileData: TileData;
}

const NumberTile: FC<Props> = ({ tileData: { power = 1, col, row } }) => {
  console.log('col', col, 'power', power);
  return (
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
        scale: 1,
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
};
export default NumberTile;
