import React from "react";
import { List, ListItem, ListItemText, Box, Typography } from "@mui/material";

const ConnectedUsers = ({ users }) => {
  return (
    <Box sx={{ width: "200px", borderRight: "1px solid #ccc", padding: 2 }}>
      <Typography component="h2" variant="h6">
        Usuarios Conectados
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConnectedUsers;
