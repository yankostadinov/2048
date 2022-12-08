import { Box, Button, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import GameControls from './components/GameControls';
import Grid from './components/Grid';
import LoseMessage from './components/LoseMessage';
import WinMessage from './components/WinMessage';
import { GameStatus } from './types';
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
            {gameStatus === GameStatus.LOSE && <LoseMessage />}
            <Grid />
          </Box>
          {gameStatus === GameStatus.IN_PROGRESS && <GameControls />}
          {gameStatus === GameStatus.WIN && <WinMessage />}
        </>
      )}
    </VStack>
  );
};

export default App;
