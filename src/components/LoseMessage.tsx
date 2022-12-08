import { Center, Text } from '@chakra-ui/react';
import { FC } from 'react';
import config from '../utils/config';

const LoseScreen: FC = () => (
  <Center
    pos="absolute"
    top="0"
    left="0"
    h="100%"
    w="100%"
    bg="blackAlpha.800"
    // make sure the win screen is always on top of the winning tile
    zIndex={config.targetPower + 1}
  >
    <Text fontSize="30px" fontWeight="bold" color="red.500">
      Game Over
    </Text>
  </Center>
);

export default LoseScreen;
