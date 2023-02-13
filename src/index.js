import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
// import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(<App />);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
