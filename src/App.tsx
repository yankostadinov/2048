import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react';
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
    <Center h="100vh" w="100vw">
      <Card align="center" px="20px" boxShadow="2xl">
        <CardHeader>
          <Heading>Welcome to 2048!</Heading>
        </CardHeader>
        <CardBody>
          <VStack as="main">
            <Button onClick={() => startGame()}>Start new game</Button>
            {gameStatus !== GameStatus.INITIAL && (
              <>
                <Box pos="relative">
                  {gameStatus === GameStatus.LOSE && <LoseMessage />}
                  <Grid />
                </Box>
              </>
            )}
          </VStack>
        </CardBody>
        <CardFooter>
          {gameStatus === GameStatus.IN_PROGRESS && <GameControls />}
          {gameStatus === GameStatus.WIN && <WinMessage />}
        </CardFooter>
      </Card>
    </Center>
  );
};

export default App;
