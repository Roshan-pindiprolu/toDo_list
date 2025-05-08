import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const Dropdown = (props) => {
  const {} = props;
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
        <label> Preferred Categories<Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            renderInput={(params) => (
            <TextField
                {...params}
                placeholder="Select ..."
            />
            )}
        />
      </label>
    </Stack>
  );
}

export default Dropdown;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'Work' },
  { title: 'Study' },
  { title: 'Personal' },
  { title: 'Fitness' },
];