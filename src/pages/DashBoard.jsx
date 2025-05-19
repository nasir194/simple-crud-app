import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Welcome, {user?.name || "User"}!</Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 4 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}
