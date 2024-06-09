import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Badge,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { auth } from "../../lib/firebase";

const ConnectedUsers = ({ users, onUserSelect, messageCounts }) => {
  const currentUser = auth.currentUser;

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = (username) => {
    onUserSelect(username);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteAccount = async () => {
    try {
      if (currentUser) {
        await currentUser.delete();
      }
    } catch (error) {
      console.error("Error al eliminar la cuenta", error);
    }
  };
  return (
    <Box sx={{ width: "200px", borderRight: "1px solid #ccc", padding: 1 }}>
      <Typography component="h2" variant="h6" sx={{ marginBottom: 1 }}>
        Usuarios Conectados
      </Typography>
      <List>
        {users.map((user, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleClick(user)}
            selected={user === messageCounts[user]}
            sx={{
              backgroundColor:
                user === messageCounts[user] ? "#1976D2" : "transparent",
              color: user === messageCounts[user] ? "black" : "#1976D2",
              borderRadius: 10,
              marginBottom: 1,
              "&:hover": {
                backgroundColor:
                  user === messageCounts[user]
                    ? "#1976D2"
                    : "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <ListItemText primary={user} />
            {/* Invert logic for Badge */}
            {messageCounts[user] === 0 || messageCounts[user] === undefined ? (
              <Badge badgeContent={0} color="error" />
            ) : (
              <Badge badgeContent={messageCounts[user]} color="error" />
            )}
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="success" onClick={handleOpenDialog}>
        Cerrar sesión
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Cierre de sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectedUsers;
