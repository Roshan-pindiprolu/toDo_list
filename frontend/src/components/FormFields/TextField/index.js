import { useState } from "react";
import TextField from '@mui/material/TextField';

const Texts = (props) => {
    const { labelName, errorText, helperText, isNumeric, ...rest } = props;
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
    };

    return (
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
        />
    );
};

export default Texts;
