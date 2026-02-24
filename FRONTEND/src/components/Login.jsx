import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Paper, Container, Grid, Alert, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
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
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
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
          Good to see you again
        </Typography>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: '12px', width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 0.5 }}>Your email</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#555', fontSize: '1.2rem' }} />
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
                placeholder="Password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handle}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#555', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 1, py: 1.5 }}>
              Sign in
            </Button>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Link to="/register" style={{ color: '#0055ff', textDecoration: 'underline', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Don't have an account?
              </Link>
              
            </Box>
          </Box>
        </Paper>
      </motion.div>

      {/* Decorative Product Icons at bottom mimicking Mangoolss */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" mt={4}>
          {['TaskFinder', 'TaskChecker', 'TaskWatcher'].map((item, i) => (
            <Paper key={i} elevation={0} sx={{ p: '8px 16px', display: 'flex', alignItems: 'center', gap: 1, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? '#ff6b54' : i === 1 ? '#fcbc3f' : '#9c27b0' }} />
              <Typography variant="body2" fontWeight="bold" color="#3d4450">{item}</Typography>
            </Paper>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
