import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Texts from "../components/FormFields/TextField"
import Email from '../components/FormFields/EmailField';
import Password from '../components/FormFields/PasswordField';
import { Checkbox, FormControlLabel, Typography, Autocomplete, TextField, Stack, Button } from '@mui/material';
import SwitchField from '../components/FormFields/SwitchField';


const Dropdown = ({ otp = [], labelName, getOptionLabel, onChange, value }) => {
  const selectedOption = otp.find(option => option.sortName === value) || null;

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <label>{labelName}</label>
      <Autocomplete
        options={otp}
        getOptionLabel={getOptionLabel}
        value={selectedOption}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} placeholder="Select..." />}
      />
    </Stack>
  );
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', password: '',
    preferredCategories: [], theme: 'light', defaultSort: 'dueDate'
  });
  // const [formData, setFormData] = useState({
  //   fullName: '', username: '', email: '', password: '',
  //   preferredCategories: [], theme: 'light',
  //   reminderTime: '', defaultSort: 'dueDate'
  // });

  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log("kkok");

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [categoriesRes, sortRes] = await Promise.all([
          axios.get('http://localhost:2400/api/meta/categories'),
          axios.get('http://localhost:2400/api/meta/sort')
        ]);
  
        setCategories(categoriesRes.data.preferredCategories);
        setSort(sortRes.data.preferredSort);
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
  
    fetchMeta();
  }, []);

  const handleCategoryChange = (e) => {
    // const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferredCategories: e.target.checked
        ? [...prev.preferredCategories, e.target.value]
        : prev.preferredCategories.filter(c => c !== e.target.value)
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:2400/api/auth/signup', formData);
      // console.log(res);
      alert(res.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert('Something went wrong. Please check if server is running!');
      }
    }
  };
  

  return (
    <>
    <form onSubmit={handleSubmit}>

      <Texts name="fullName" nameOfTheField="Full Name" sx={{ p: 1 }} sizeOfTheField="small" handleChanges={handleChange} />

      <Texts name="username" nameOfTheField="Username" sx={{ p: 1 }} sizeOfTheField="small" handleChanges={handleChange} required/>

      <Email name="email" handleChanges={handleChange} />
      <Password name="password" handleChanges={handleChange} />

      <Typography variant="body1">Preferred Categories:</Typography>
      {categories.map((cat) => (
        <FormControlLabel
          key={cat.id}
          control={
            <Checkbox
              value={cat.category}
              checked={formData.preferredCategories.includes(cat.category)}
              onChange={handleCategoryChange}
            />
          }
          label={cat.category}
        />
      ))}

      <SwitchField name="theme" handleChanges={handleChange}/>
      {/* <input name="reminderTime" placeholder="Daily Reminder Time (HH:MM)" onChange={handleChange} /> */}
      {sort.length > 0 && (
        <Dropdown
          labelName="Sort:"
          otp={sort}
          value={formData.defaultSort}
          getOptionLabel={(option) => option.sortDisplayName}
          onChange={(event, newValue) => {
            setFormData(prev => ({
              ...prev,
              defaultSort: newValue ? newValue.sortName : ''
            }));
          }}
        />
      )}
      <Button type="submit" variant="contained" sx={{ my: 2 }}>Sign Up</Button>
    </form>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  );
};

export default SignupForm;