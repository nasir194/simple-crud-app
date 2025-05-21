import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <Paper elevation={3}>
      <TableContainer>
        <Typography variant="h5" sx={{ p: 2 }}>
          User Directory
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              {["Full Name", "Email", "Age", "Gender", "Phone", "Actions"].map(
                (header) => (
                  <TableCell key={header}>{header}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Age}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
