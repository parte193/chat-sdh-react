import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat SDH Inc.
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;