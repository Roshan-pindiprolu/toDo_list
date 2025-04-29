import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const Password = () => {
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
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={error}
                    />
                    <FormHelperText error={error}>
                        {error ? errorMessage : 'Enter a strong password'}
                    </FormHelperText>
                </FormControl>
            </div>
        </Box>
    );
};

export default Password;
