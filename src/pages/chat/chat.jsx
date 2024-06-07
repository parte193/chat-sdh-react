import  { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import ConnectedUsers from '/src/components/conected-users/ConnectedUsers';

const Chat = () => {
  const location = useLocation();
  const { user } = location.state || { user: 'Guest' };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        user: user,
        text: message.trim(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex' }}>
        <ConnectedUsers users={[{ name: user }]} />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 3,
          }}
        >
          <Typography component="h1" variant="h5">
            Chat Page
          </Typography>
          <Typography component="p" variant="body1">
            Welcome, {user}!
          </Typography>
          <Box sx={{ width: '100%', marginTop: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={msg.user === user ? 'You' : msg.user}
                    secondary={msg.text}
                    align={msg.user === user ? 'right' : 'left'}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Copia el mensaje..."
              value={message}
              onChange={handleInputChange}
              sx={{ marginRight: 1 }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;

