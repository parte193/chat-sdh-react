import { Box, List, ListItem, ListItemText } from "@mui/material";

const MessageList = ({ messages, currentUser }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        maxHeight: "calc(100vh - 160px)",
        padding: "0 16px",
      }}
    >
      <List>
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            alignItems={msg.user === currentUser ? "flex-end" : "flex-start"}
            sx={{
              display: "flex",
              justifyContent:
                msg.user === currentUser ? "flex-end" : "flex-start",
            }}
          >
            <ListItemText
              primary={msg.user === currentUser ? "You" : msg.user}
              secondary={msg.text}
              primaryTypographyProps={{
                align: msg.user === currentUser ? "right" : "left",
              }}
              secondaryTypographyProps={{
                align: msg.user === currentUser ? "right" : "left",
              }}
              sx={{ textAlign: msg.user === currentUser ? "right" : "left" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
