import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Icon,
} from "@mui/material";
import { EmojiEmotions } from "@mui/icons-material";
import { database, ref, onValue } from "../../lib/firebase";
import ConnectedUsers from "/src/components/connected-users/ConnectedUsers";

const Chat = () => {
  const location = useLocation();
  const { user } = location.state || { user: "Guest" };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const usersRef = ref(database, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.keys(data).map((key) => data[key].username);
        setConnectedUsers(usersArray);
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        user: user,
        text: message.trim(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ height: "90vh", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ flex: 1, display: "flex", marginTop: 8 }}>
        <ConnectedUsers users={connectedUsers} />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 3,
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Chat en línea
          </Typography>
          <Typography component="p" variant="body1">
            Bienvenido, {user}!
          </Typography>
          <Box
            sx={{
              width: "100%",
              flex: 1,
              marginTop: 2,
              maxHeight: "70vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                flexGrow: 1,
              }}
            >
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={msg.user === user ? "Tú" : msg.user}
                    secondary={msg.text}
                    align={msg.user === user ? "right" : "left"}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Escribir mensaje..."
              value={message}
              onChange={handleInputChange}
              sx={{ marginRight: 1 }}
            />
            <Icon sx={{ marginRight: 1 }}>
              <EmojiEmotions />
            </Icon>
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
