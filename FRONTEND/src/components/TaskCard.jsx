import { Card, CardContent, Typography, CardActions, IconButton, Chip, Box } from '@mui/material';
import { DeleteOutline as DeleteIcon, EditOutlined as EditIcon, CheckCircleOutline as CheckIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ff4757';
            case 'Medium': return '#ffa502';
            case 'Low': return '#2ed573';
            default: return '#eccc68';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#00cc44';
            case 'In Progress': return '#3742fa';
            case 'Pending': return '#888888';
            default: return '#888888';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    opacity: task.status === 'Completed' ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.06)',
                    '&:hover': {
                        boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Chip
                            size="small"
                            label={task.priority}
                            sx={{ backgroundColor: getPriorityColor(task.priority) + '20', color: getPriorityColor(task.priority), fontWeight: 'bold', borderRadius: '6px' }}
                        />
                        <Chip
                            size="small"
                            label={task.status}
                            variant="outlined"
                            sx={{ borderColor: getStatusColor(task.status), color: getStatusColor(task.status), fontWeight: 'bold', borderRadius: '6px' }}
                        />
                    </Box>
                    <Typography variant="h6" component="h2" fontWeight="800" color="#2c3e50" gutterBottom sx={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        {task.title}
                    </Typography>
                    <Typography variant="body2" color="#666" paragraph sx={{ lineHeight: 1.6 }}>
                        {task.description || 'No description provided.'}
                    </Typography>
                    {task.dueDate && (
                        <Typography variant="caption" fontWeight="bold" color="#999" display="inline-block" sx={{ mt: 1, background: '#f5f5f5', px: 1.5, py: 0.5, borderRadius: '4px' }}>
                            📅 Due: {format(new Date(task.dueDate), 'MMM do, yyyy')}
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', borderTop: '1px solid rgba(0,0,0,0.04)', p: 1.5, gap: 0.5 }}>
                    <IconButton
                        sx={{ color: task.status === 'Completed' ? '#888' : '#00cc44' }}
                        onClick={() => onStatusChange(task._id, task.status === 'Completed' ? 'Pending' : 'Completed')}
                        title="Toggle Completion"
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#3742fa' }} onClick={() => onEdit(task)} title="Edit Task">
                        <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: '#ff4757' }} onClick={() => onDelete(task._id)} title="Delete Task">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </motion.div>
    );
}
