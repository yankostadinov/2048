import { FC, useMemo, useState } from 'react';
import { generateGrid, pickRandomEmptyPosition } from '../utils';
import NumberBlock from './NumberBlock';
import './Grid.css';

interface Props {
  size: number;
}

const Grid: FC<Props> = ({ size }) => {
  const startingGrid = useMemo(() => generateGrid(size), [size]);
  const [grid, setGrid] = useState(startingGrid);

  const onButtonClick = () => {
    const newSpotToFill = pickRandomEmptyPosition(grid);
    setGrid(
      grid.map((values, row) =>
        row === newSpotToFill?.row
          ? values.map((value, col) => (col === newSpotToFill.col ? 2 : value))
          : values,
      ),
    );
  };

  return (
    <main className="Grid-Container">
      <section className="Grid-Controls">
        <button onClick={onButtonClick}>Left</button>
        <button onClick={onButtonClick}>Up</button>
        <button onClick={onButtonClick}>Right</button>
        <button onClick={onButtonClick}>Down</button>
      </section>
      <section className="Grid">
        {grid.map((values, row) => (
          <div key={row} className="Grid-Row">
            {values.map((value, col) => (
              <NumberBlock number={value} key={`${row}-${col}`} />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Grid;
