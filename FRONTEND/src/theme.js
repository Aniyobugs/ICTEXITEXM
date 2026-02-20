import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#00cc44', // Mangools green button
            dark: '#00a838',
        },
        secondary: {
            main: '#ff6b54', // Orange accent
        },
        background: {
            default: '#fbf8f1', // Soft warm white background
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800, color: '#2c3e50' },
        h2: { fontWeight: 800, color: '#3d4450' },
        h3: { fontWeight: 700, color: '#3d4450' },
        h4: { fontWeight: 700, color: '#3d4450' },
        button: { textTransform: 'none', fontWeight: 700, fontSize: '1.1rem' },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '12px 24px',
                    borderRadius: '50px', // Pill-shaped buttons
                    transition: 'all 0.3s ease',
                },
                containedPrimary: {
                    backgroundColor: '#00cc44',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px 0 rgba(0, 204, 68, 0.39)',
                    '&:hover': {
                        backgroundColor: '#00a838',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0, 204, 68, 0.23)',
                    }
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: '#e0e0e0',
                        borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                        borderColor: '#cccccc',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#00cc44',
                    },
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#888888',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transform: 'none',
                    position: 'static',
                    marginBottom: '8px',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.02)',
                }
            }
        }
    },
});

export default theme;
