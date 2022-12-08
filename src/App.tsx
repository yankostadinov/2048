import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import GameControls from './components/GameControls';
import Grid from './components/Grid';
import { GameStatus } from './types';
import config from './utils/config';
import useGameStore from './utils/store';

const App: FC = () => {
  const startGame = useGameStore(store => store.startGame);
  const gameStatus = useGameStore(store => store.gameStatus);

  return (
    <VStack as="main">
      <Button onClick={() => startGame()}>Start new game</Button>
      {gameStatus !== GameStatus.INITIAL && (
        <>
          <Box pos="relative">
            {[GameStatus.LOSE, GameStatus.WIN].includes(gameStatus) && (
              <Center
                pos="absolute"
                top="0"
                left="0"
                h="100%"
                w="100%"
                bg="blackAlpha.700"
                // make sure the win screen is always on top of the winning tile
                zIndex={config.targetPower + 1}
              >
                <Text color="white">
                  {gameStatus === GameStatus.WIN
                    ? 'Congratulations, you win!'
                    : 'Game Over'}
                </Text>
              </Center>
            )}
            <Grid />
          </Box>
          {gameStatus === GameStatus.IN_PROGRESS && <GameControls />}
        </>
      )}
    </VStack>
  );
};

export default App;
