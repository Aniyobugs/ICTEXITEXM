import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

export default function TaskModal({ open, onClose, onSave, taskToEdit }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'Pending'
    });

    useEffect(() => {
        if (taskToEdit) {
            setForm({
                ...taskToEdit,
                dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
            });
        } else {
            setForm({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Medium',
                status: 'Pending'
            });
        }
    }, [taskToEdit, open]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' } }}>
            <DialogTitle fontWeight="800" fontSize="1.5rem" color="#2c3e50">{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3, borderColor: '#f0f0f0' }}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 1 }}>Task Title</Typography>
                        <TextField autoFocus required name="title" fullWidth value={form.title} onChange={handleChange} placeholder="e.g. Finish the quarterly report..." />
                    </Box>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 1 }}>Description</Typography>
                        <TextField name="description" multiline rows={3} fullWidth value={form.description} onChange={handleChange} placeholder="Add more details here..." />
                    </Box>
                    <Box display="flex" gap={2}>
                        <Box flex={1}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 1 }}>Due Date</Typography>
                            <TextField name="dueDate" type="date" fullWidth value={form.dueDate} onChange={handleChange} />
                        </Box>
                        <Box flex={1}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 1 }}>Priority</Typography>
                                <Select name="priority" value={form.priority} onChange={handleChange} sx={{ borderRadius: '6px', '& fieldset': { borderWidth: '2px', borderColor: '#e0e0e0' } }}>
                                    <MenuItem value="Low" sx={{ fontWeight: 'bold', color: '#2ed573' }}>Low</MenuItem>
                                    <MenuItem value="Medium" sx={{ fontWeight: 'bold', color: '#ffa502' }}>Medium</MenuItem>
                                    <MenuItem value="High" sx={{ fontWeight: 'bold', color: '#ff4757' }}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box>
                        <FormControl fullWidth>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#888', mb: 1 }}>Status</Typography>
                            <Select name="status" value={form.status} onChange={handleChange} sx={{ borderRadius: '6px', '& fieldset': { borderWidth: '2px', borderColor: '#e0e0e0' } }}>
                                <MenuItem value="Pending" sx={{ fontWeight: 'bold', color: '#888' }}>Pending</MenuItem>
                                <MenuItem value="In Progress" sx={{ fontWeight: 'bold', color: '#3742fa' }}>In Progress</MenuItem>
                                <MenuItem value="Completed" sx={{ fontWeight: 'bold', color: '#00cc44' }}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={onClose} sx={{ color: '#888', '&:hover': { background: '#f5f5f5' } }}>Cancel</Button>
                    <Button type="submit" variant="contained" sx={{ px: 4 }}>Save Task</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
