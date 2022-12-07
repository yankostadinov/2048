import { Button, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MoveDirection } from '../types';
import useGameStore from '../utils/store';

const GameControls: FC = () => {
  const move = useGameStore(store => store.move);

  return (
    <HStack justify="center">
      <Button onClick={() => move(MoveDirection.LEFT)}>Left</Button>
      <Button onClick={() => move(MoveDirection.UP)}>Up</Button>
      <Button onClick={() => move(MoveDirection.DOWN)}>Down</Button>
      <Button onClick={() => move(MoveDirection.RIGHT)}>Right</Button>
    </HStack>
  );
};

export default GameControls;
