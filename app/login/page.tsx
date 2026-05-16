"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Check if Firebase is initialized
const isFirebaseInitialized = auth !== null;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    if (!isFirebaseInitialized) {
      setError("Firebase is not configured. Please set up your environment variables.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!auth) {
        throw new Error("Firebase auth is not available");
      }

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/dashboard"); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
            CreativeVote
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sign in to check your votes and track your ranking.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            fullWidth
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            New to CreativeVote?{" "}
            <Link href="/register" passHref style={{ textDecoration: "none" }}>
              <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                Create an Account
              </Typography>
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link href="/" passHref style={{ textDecoration: "none" }}>
              <Typography component="span" variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                Back to Home
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
