import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import {
  Container, Grid, Typography, Box, Fab, AppBar, Toolbar, IconButton,
  Menu, MenuItem, Avatar, Tooltip, CircularProgress, Paper, Button
} from '@mui/material';
import { Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const res = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map((t) => (t._id === editingTask._id ? res.data.task : t)));
      } else {
        const res = await axios.post('http://localhost:5000/api/tasks', taskData);
        setTasks([res.data.task, ...tasks]);
      }
      setModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? res.data.task : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 10 }}>
      <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(252, 251, 250, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b54, #fcbc3f)', mr: 1.5 }} />
            <Typography variant="h5" fontWeight="800" sx={{ color: '#2c3e50', letterSpacing: '-0.5px' }}>
              TaskMaster
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Account settings">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#ff6b54', fontWeight: 'bold' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ sx: { mt: 1, borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.04)' } }}
      >
        <Box px={2} py={1}>
          <Typography variant="body2" fontWeight="bold" color="#333">{user?.name}</Typography>
          <Typography variant="caption" color="#888">{user?.email}</Typography>
        </Box>
        <MenuItem onClick={logout} sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          <LogoutIcon fontSize="small" sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      <Container maxWidth="lg" sx={{ mt: 8, position: 'relative', zIndex: 10 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Typography variant="h3" fontWeight="800" color="#3d4450">My Tasks</Typography>
          <Button variant="contained" color="secondary" onClick={openCreateModal} startIcon={<AddIcon />} sx={{ borderRadius: '50px', background: 'linear-gradient(135deg, #ff6b54 0%, #fcbc3f 100%)', boxShadow: '0 4px 14px rgba(255, 107, 84, 0.4)', '&:hover': { background: 'linear-gradient(135deg, #e65c47 0%, #e5a939 100%)' } }}>
            New Task
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress color="secondary" />
          </Box>
        ) : tasks.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={10} opacity={0.6}>
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Check%20mark%20button/3D/check_mark_button_3d.png" alt="Empty" width="80" style={{ filter: 'grayscale(1)', opacity: 0.5, marginBottom: 16 }} />
            <Typography variant="h6" fontWeight="bold">You're all caught up!</Typography>
            <Typography variant="body2">No tasks found. Take a break or create one.</Typography>
          </Box>
        ) : (
          <motion.div layout>
            <Grid container spacing={3}>
              <AnimatePresence>
                {tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task._id}>
                    <TaskCard
                      task={task}
                      onEdit={openEditModal}
                      onDelete={handleDeleteTask}
                      onStatusChange={handleStatusChange}
                    />
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </motion.div>
        )}
      </Container>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </Box>
  );
}
