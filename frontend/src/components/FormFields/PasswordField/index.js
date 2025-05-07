import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Typography } from '@mui/material';

const Password = (props) => {
    const { handleChanges } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (value) => {
        if (value.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[a-z]/.test(value)) {
            return 'Must include a lowercase letter';
        }
        if (!/[A-Z]/.test(value)) {
            return 'Must include an uppercase letter';
        }
        if (!/[0-9]/.test(value)) {
            return 'Must include a number';
        }
        if (!/[@$!%*?&]/.test(value)) {
            return 'Must include a special character (@ $ ! % * ? &)';
        }
        return ''; // no error
    };

    const handleBlur = (e) => {
        const value = e.target.value;
        const message = validatePassword(value);

        if (message === '') {
            setInput(value);
            setError(false);
            setErrorMessage('');
        } else {
            setError(true);
            setErrorMessage(message);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
        handleChanges(e);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, mr: 5}}>
                Password
            </Typography>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                value={input}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error}
                size="small"
            />
            <FormHelperText error={error} sx={{ mx: 2, mb: 1 }}>
                {error ? errorMessage : 'Enter a strong password'}
            </FormHelperText>
        </Box>
    );
};

export default Password;
