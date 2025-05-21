import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const API_URL = "http://localhost:3000/users";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (userData) => {
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, userData);
      } else {
        await axios.post(API_URL, userData);
      }
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <>
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <UserForm
          key={editingUser?.id || "create"}
          editingUser={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setEditingUser(null)}
        />
        <UserList
          users={users}
          onEdit={setEditingUser}
          onDelete={handleDelete}
        />
      </Container>
    </>
  );
}
