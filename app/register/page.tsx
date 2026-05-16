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
  MenuItem,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from "@mui/material";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ContestantProfile } from "@/types";

// Check if Firebase is initialized
const isFirebaseInitialized = auth !== null && db !== null;

const categories = [
  { value: "photography", label: "Photography" },
  { value: "fashion", label: "Fashion Design" },
  { value: "graphics", label: "Graphics Design" },
];

const steps = ["Personal Info", "Category Details", "Review"];

export default function RegisterPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    stageName: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill out all required fields.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    if (activeStep === 1) {
      if (!formData.category || !formData.stageName || !formData.bio) {
        setError("Please fill out all category details.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    if (!isFirebaseInitialized) {
      setError("Firebase is not configured. Please set up your environment variables.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (!auth || !db) {
        throw new Error("Firebase services are not available");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.fullName
      });

      const userProfile: ContestantProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: formData.fullName,
        role: "contestant",
        createdAt: new Date(),
        updatedAt: new Date(),
        stageName: formData.stageName,
        category: formData.category,
        bio: formData.bio,
        votes: 0,
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      
      router.push("/login?registered=true");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during registration.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: "bold" }}>
            CreativeVote
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Register to showcase your talent and win amazing prizes.
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && (
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              variant="outlined"
              fullWidth
              required
              value={formData.fullName}
              onChange={handleChange}
            />
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              label="Category"
              name="category"
              variant="outlined"
              fullWidth
              required
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Stage Name / Brand Name"
              name="stageName"
              variant="outlined"
              fullWidth
              required
              value={formData.stageName}
              onChange={handleChange}
            />
            <TextField
              label="Short Bio / Why are you interested?"
              name="bio"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
              value={formData.bio}
              onChange={handleChange}
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Information</Typography>
            <Box sx={{ mb: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="body2"><strong>Name:</strong> {formData.fullName}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
              <Typography variant="body2">
                <strong>Category:</strong> {categories.find(c => c.value === formData.category)?.label}
              </Typography>
              <Typography variant="body2"><strong>Stage Name:</strong> {formData.stageName}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><strong>Bio:</strong> {formData.bio}</Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Submit Registration
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Continue
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link href="/login" passHref style={{ textDecoration: "none" }}>
              <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                Log in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
