import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        user: 'Guest',
        text: message.trim(),
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', padding: 2, backgroundColor: '#ffffff' }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Copia el mensaje..."
          value={message}
          onChange={handleInputChange}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default MessageInput;
