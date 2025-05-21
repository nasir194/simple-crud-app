import { Cancel, PersonAdd, Save } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    Age: "",
    gender: "",
    phone_number: "",
  });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {editingUser ? "Edit User" : "Create User"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            required
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            required
            name="last_name"
            label="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <TextField
            required
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              required
              type="number"
              name="Age"
              label="Age"
              value={formData.Age}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />

            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TextField
            required
            name="phone_number"
            label="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>
            {editingUser ? (
              <>
                <Button type="submit" variant="contained" startIcon={<Save />}>
                  Update User
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="contained"
                startIcon={<PersonAdd />}
              >
                Add User
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
