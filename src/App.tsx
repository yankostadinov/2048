import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import GameControls from './components/GameControls';
import Grid from './components/Grid';
import useGameStore from './utils/store';

const App: FC = () => {
  const [size, setSize] = useState(6);
  const startGame = useGameStore(store => store.startGame);
  const gameState = useGameStore(store => store.gameState.value);

  return (
    <VStack as="main">
      <HStack>
        <Button onClick={() => setSize(size - 1)} disabled={size === 3}>
          -
        </Button>
        <span>{size}</span>
        <Button onClick={() => setSize(size + 1)}>+</Button>
      </HStack>
      <Button onClick={() => startGame(size)}>Start new game</Button>
      {gameState !== 'NOT_STARTED' && (
        <>
          <Box pos="relative">
            {gameState === 'OVER' && (
              <Center
                pos="absolute"
                top="0"
                left="0"
                h="100%"
                w="100%"
                bg="blackAlpha.700"
                zIndex={3}>
                <Text color="white">Game Over</Text>
              </Center>
            )}
            <Grid key={size} />
          </Box>
          {gameState === 'IN_PROGRESS' && <GameControls />}
        </>
      )}
    </VStack>
  );
};

export default App;
