import { FC } from 'react';
import {Length} from './Components/Length.tsx'

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      {/* <h1>Hello {name}!</h1>
      <p>Start editing to see some magic happen :)</p> */}
      <Length />
    </div>
  );
};
