import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFE81F' },
    background: { default: '#0a0a0a', paper: '#1a1a2e' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Box sx={{ pt: 8 }}>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:uid" element={<CharacterDetail />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
