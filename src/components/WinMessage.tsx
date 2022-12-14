import { Center, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { motion } from 'framer-motion';

const WinScreen: FC = () => (
  <Center>
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        color: ['#FF0000', '#00FF00'],
        transition: { repeat: Infinity },
      }}
    >
      <Text fontWeight="bold" fontSize="25px">
        Congratulations, you win!
      </Text>
    </motion.div>
  </Center>
);

export default WinScreen;
