import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={{
                    style: { color: '#d5d5d5' }, // Text color
                    endAdornment: name === 'password' ? (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility style={{ color: 'white' }} /> : <VisibilityOff style={{ color: 'white' }} />}
                            </IconButton>
                        </InputAdornment>
                    ) : null,
                    classes: {
                        notchedOutline: 'MuiOutlinedInput-notchedOutline', // To target the outline color
                    }
                }}
                InputLabelProps={{
                    style: { color: '#d5d5d5' }, // Label color
                }}
                FormHelperTextProps={{
                    style: { color: '#d5d5d5' }, // Helper text color if any
                }}
            />
        </Grid>
    );
}

export default Input;
