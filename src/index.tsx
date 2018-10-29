import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Weatherbalt from './components/Weatherbalt';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Weatherbalt />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
