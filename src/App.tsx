import { FC, useMemo, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import { generateGrid } from './utils';

const App: FC = () => {
  const [size, setSize] = useState(6);
  return (
    <div className="App">
      <div>
        <button onClick={() => setSize(size - 1)} disabled={size === 3}>
          -
        </button>
        <span>{size}</span>
        <button onClick={() => setSize(size + 1)}>+</button>
      </div>
      <Grid size={size} key={size} />
    </div>
  );
};

export default App;
