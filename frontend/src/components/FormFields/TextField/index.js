import { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Texts = (props) => {
    const { labelName, nameOfTheField, errorText, helperText, isNumeric, handleChanges, sizeOfTheField, ...rest } = props;
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const regexString = /^[A-Za-z\s]*$/;
    const regexNumber = /^[0-9]*$/;

    const handleBlur = (e) => {
        const value = e.target.value;
        const isValid = isNumeric ? regexNumber.test(value) : regexString.test(value);

        if (isValid) {
            setInput(value);
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
        handleChanges(e);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography variant="body1" sx={{ mb: 2}}>
                    {nameOfTheField}
                </Typography>
                <TextField
                    id="outlined-basic"
                    label={labelName}
                    variant="outlined"
                    helperText={error ? errorText : helperText}
                    value={input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={error}
                    {...rest}
                    size={sizeOfTheField}   
                />
            </Box>
        </>
    );
};

export default Texts;
