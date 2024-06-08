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
  IconButton,
  Divider,
  InputLabel,
  Input,
} from "@mui/material";
import {
  database,
  ref,
  onValue,
  push,
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
} from "../../lib/firebase";
import ConnectedUsers from "/src/components/connected-users/ConnectedUsers";
import PhotoIcon from "@mui/icons-material/Photo";

const Chat = () => {
  const location = useLocation();
  const { user: currentUser } = location.state || { user: "Guest" };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(null);

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

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const sendMessage = async (event) => {
    if (
      (event.type === "click" || event.key === "Enter") &&
      (message.trim() !== "" || image)
    ) {
      const newMessage = {
        user: currentUser,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      if (image) {
        const imgStorageRef = storageRef(storage, `images/${image.name}`);
        await uploadBytes(imgStorageRef, image);
        const imageUrl = await getDownloadURL(imgStorageRef);
        newMessage.imageUrl = imageUrl;
        setImage(null);
      }

      const messagesRef = ref(database, "messages/");
      push(messagesRef, newMessage);

      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleUserSelect = (username) => {
    setSelectedUser(username === currentUser ? null : username);
    setMessage("");
  };

  useEffect(() => {
    const messagesRef = ref(database, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map((key) => data[key]);
        setMessages(messagesArray);
      }
    });
  }, []);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ height: "90vh", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ flex: 1, display: "flex", marginTop: 8 }}>
        <ConnectedUsers
          users={connectedUsers}
          onUserSelect={handleUserSelect}
        />
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
          {!selectedUser && (
            <Typography component="h7" variant="body1">
              Bienvenido, {currentUser}!
            </Typography>
          )}
          {selectedUser && (
            <Box sx={{ marginTop: 0}}>
              <Typography variant="h7" sx={{ color: "#1976D2" }}>
                Chat con {selectedUser}
              </Typography>
            </Box>
          )}
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
            <List sx={{ flexGrow: 1 }}>
              {messages.map((msg, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={`${msg.user} (${msg.timestamp})`}
                    secondary={
                      <>
                        {msg.text}
                        {msg.imageUrl && (
                          <img
                            src={msg.imageUrl}
                            alt="uploaded"
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                              marginTop: "8px",
                            }}
                          />
                        )}
                      </>
                    }
                    sx={{
                      textAlign: msg.user === currentUser ? "right" : "left",
                    }}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          <Divider sx={{ width: "100%" }} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              marginTop: 2,
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Escribir mensaje..."
              value={message}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage(event);
                }
              }}
              sx={{ marginRight: 1 }}
              disabled={!selectedUser}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              sx={{ display: "none" }}
              id="upload-image"
            />
            <InputLabel htmlFor="upload-image" sx={{display: "flex", justifyContent: "center"}}>
              <IconButton component="span">
                <PhotoIcon />
              </IconButton>
            </InputLabel>
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage(event);
                }
              }}
              disabled={!selectedUser}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
