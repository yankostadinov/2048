import { Button, HStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { MoveDirection } from '../types';
import config from '../utils/config';
import useGameStore from '../utils/store';

const GameControls: FC = () => {
  const move = useGameStore(store => store.move);

  useEffect(() => {
    if (!config.keyboardShortcutsEnabled) return;

    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') move(MoveDirection.LEFT);
      else if (event.key === 'ArrowUp') move(MoveDirection.UP);
      else if (event.key === 'ArrowDown') move(MoveDirection.DOWN);
      else if (event.key === 'ArrowRight') move(MoveDirection.RIGHT);
    };
    document.addEventListener('keydown', keydownListener);
    return () => document.removeEventListener('keydown', keydownListener);
  }, []);

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
