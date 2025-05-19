import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && data.email === user.email && data.password === user.password) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {loginError && (
          <Typography color="error" variant="body2">
            {loginError}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </form>
    </Box>
  );
}
