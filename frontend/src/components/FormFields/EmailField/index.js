import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Email = (props) => {
    const { handleChanges, ...rest } = props
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
        handleChanges(e)
    };

    let errorMessage = error ? "Please enter the correct email format" : ""

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant="body1" sx={{ mb: 2, mr: 5}}>
              Email
          </Typography>
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            startAdornment={<InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>}
            value={input}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            size="small"
            {...rest}
          />
          <FormHelperText id="outlined-weight-helper-text" error={error}>{errorMessage}</FormHelperText>
      </Box>
  );
}

export default Email;
