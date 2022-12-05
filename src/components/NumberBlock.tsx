import { FC } from 'react';
import './NumberBlock.css';

interface Props {
  number?: number;
}

const NumberBlock: FC<Props> = ({ number = 0 }) => {
  return <span className="NumberBlock">{number || '-'}</span>;
};

export default NumberBlock;
