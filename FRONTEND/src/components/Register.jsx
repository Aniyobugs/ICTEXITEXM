import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon, Email as EmailIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/register', form);
      login(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2 }}>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Box
            sx={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b54, #fcbc3f)', mr: 1.5
            }}
          />
          <Typography variant="h6" fontWeight="800" sx={{ color: '#2c3e50', letterSpacing: '-0.5px' }}>
            TaskMaster
          </Typography>
        </Box>

        <Typography variant="h3" sx={{ textAlign: 'center', mb: 3, fontWeight: '800', color: '#3d4450' }}>
          Create your account
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: '12px', width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 0.5 }}>Full name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Fullname"
                name="name"
                required
                value={form.name}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#aaa', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 0.5 }}>Your email</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. aniyo@gmail.com"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#aaa', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 0.5 }}>Your password</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Min 6 characters"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#aaa', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 0.5 }}>Confirm password</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Retype password"
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#aaa', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 1, py: 1.5 }}>
              Create Account
            </Button>

            <Box display="flex" justifyContent="center" mt={2}>
              <Link to="/login" style={{ color: '#0055ff', textDecoration: 'underline', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
