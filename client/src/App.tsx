import {CssBaseline, StyledEngineProvider} from '@mui/material';

import Main from './pages/Main';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <Main />
    </StyledEngineProvider>
  );
};

export default App;
