import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';

const Email = () => {
    // const EmailTextFields = (props) => {
    // const {} = props
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);


    const handleBlur = (e) => {
        const value = e.target.value;
        const isValid = value.includes('@');

        if (isValid) {
            setInput(value);
            setError(false);
        } else {
            setError(true);
        }
    };


    const handleChange = (e) => {
        setInput(e.target.value);
    };

    let errorMessage = error ? "Please enter the correct email format" : ""

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>}
            label="Email"
            value={input}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
          />
          <FormHelperText id="outlined-weight-helper-text" error={error}>{errorMessage}</FormHelperText>
    </FormControl>
  );
}

export default Email;
