import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: 'transparent',
        borderRadius: '15px',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
        margin: '20px 0',
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white', // Outline color when not focused
                },
                '&:hover fieldset': {
                    borderColor: 'white', // Outline color on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white', // Outline color when focused
                },
            },
            '& .MuiInputLabel-root': {
                color: 'white', // Label color
            },
            '& .MuiInputBase-input': {
                color: 'white', // Text color
            },
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
}));
