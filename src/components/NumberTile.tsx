import { Center } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { FC } from 'react';
import { TileData } from '../types';
import config from '../utils/config';

interface Props {
  tileData: TileData;
}

const animationVariants: Variants = {
  upgrading: ({ col, row }) => ({
    scale: [1, 1.6, 1],
    transition: { scale: { delay: 0.1, duration: 0.5 } },
    x: col * 75,
    y: row * 75,
  }),
  default: ({ col, row }) => ({
    scale: 1,
    x: col * 75,
    y: row * 75,
    // scale only animates here when tile initially spawns
    transition: { scale: { delay: 0.2 } },
  }),
};

const NumberTile: FC<Props> = ({
  tileData: { power = 1, col, row, upgradedThisTurn },
}) => (
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
    // custom props being passed to animation variants
    custom={{ col, row }}
    variants={animationVariants}
    animate={upgradedThisTurn ? 'upgrading' : 'default'}
  >
    <Center
      w="65px"
      h="65px"
      bg={config.powerColors[power]}
      borderRadius={5}
      m="5px"
      fontSize="20px"
    >
      {Math.pow(2, power)}
    </Center>
  </motion.div>
);

export default NumberTile;
