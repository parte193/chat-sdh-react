import { useState } from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";

const ConnectedUsers = ({ users, onUserSelect }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClick = (username) => {
    setSelectedUser(username === selectedUser ? null : username);
    onUserSelect(username === selectedUser ? null : username);
  };

  return (
    <Box sx={{ width: "200px", borderRight: "1px solid #ccc", padding: 2 }}>
      <Typography component="h2" variant="h6" sx={{ marginBottom: 1 }}>
        Usuarios Conectados
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleClick(user)}
            selected={user === selectedUser}
            sx={{
              backgroundColor: user === selectedUser ? "#1976D2" : "rgba(0, 0, 0, 0.2)",
              color: user === selectedUser ? "black" : "#1976D2",
              borderRadius: 10,
              marginBottom: 1,
              "&:hover": {
                backgroundColor: user === selectedUser ? "#1976D2" : "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConnectedUsers;

