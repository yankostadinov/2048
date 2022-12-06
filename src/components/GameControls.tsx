import { Button, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import useGameStore from '../utils/store';

const GameControls: FC = () => {
  const addNewTile = useGameStore(store => store.addNewTile);

  return (
    <HStack justify="center">
      <Button onClick={addNewTile}>Left</Button>
      <Button onClick={addNewTile}>Up</Button>
      <Button onClick={addNewTile}>Down</Button>
      <Button onClick={addNewTile}>Right</Button>
    </HStack>
  );
};

export default GameControls;
