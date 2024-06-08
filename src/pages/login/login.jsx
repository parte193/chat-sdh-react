import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { database, ref, set, get } from "../../lib/firebase";
import { styled } from '@mui/system';
import logo from '/src/images/logo.jpg';

const Login = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      try {
        const dbRef = ref(database, "users/" + user);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          console.log("User already exists");
        } else {
          await set(dbRef, {
            username: user,
          });
          navigate("/chat", { state: { user } });
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  const StyledImage = styled('img')(() => ({
width: '200px',
height: 'auto',  
borderRadius: '8px',
  }));

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"

    >
      <StyledImage src={logo} alt="logo" />
    </Box>
        <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Nombre de usuario"
            name="user"
            autoComplete="user"
            autoFocus
            value={user}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
