import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Texts from "../components/FormFields/TextField"
import Email from '../components/FormFields/EmailField';
import Password from '../components/FormFields/PasswordField';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import SwitchField from '../components/FormFields/SwitchField';


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

  // const categories = ['Work', 'Study', 'Personal', 'Fitness'];
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    axios.get('http://localhost:2400/api/meta/categories')
      .then(res => setCategories(res.data.preferredCategories))
      .catch(err => console.error('Failed to fetch categories:', err));
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
      <select name="defaultSort" onChange={handleChange}>
        <option value="dueDate">Due Date</option>
        <option value="category">Category</option>
        <option value="createdAt">Created At</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;