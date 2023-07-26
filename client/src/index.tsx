import {createRoot} from 'react-dom/client';

import App from './App';

function render() {
  createRoot(document.getElementById('root'))
    .render(<App />);
}

render();
