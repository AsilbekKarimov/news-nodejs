import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
        color: 'white',
      },
      '& .MuiInputLabel-root': {
        color: 'white',
      },
      '& .MuiInputBase-input': {
        color: 'white',
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderRadius: '15px',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
    margin: '20px 0',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: 'transparent',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'white', // White text color for file input
    '& .MuiInputBase-root': {
      color: 'white', // White text color for the input label
    },
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: '#007bff', // Custom blue color for the submit button
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
  },
  buttonClear: {
    backgroundColor: '#ff4d4d', // Custom red color for the clear button
    color: '#fff',
    '&:hover': {
      backgroundColor: '#cc0000', // Darker red on hover
    },
  },
}));
