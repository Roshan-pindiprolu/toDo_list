import React, { useState } from 'react';
import axios from 'axios';
import Texts from "../components/FormFields/TextField"
import Email from '../components/FormFields/EmailField';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', password: '',
    preferredCategories: [], theme: 'light',
    reminderTime: '', defaultSort: 'dueDate'
  });

  const categories = ['Work', 'Study', 'Personal', 'Fitness'];

  const handleChange = (e) => {
    // const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Came");
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({ ...prev, preferredCategories: [...prev.preferredCategories, value] }));
    } else {
      setFormData(prev => ({ ...prev, preferredCategories: prev.preferredCategories.filter(c => c !== value) }));
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post('http://localhost:2400/api/auth/signup', formData);
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

      <Texts name="username" nameOfTheField="Username" sx={{ p: 1 }} sizeOfTheField="small" handleChanges={handleChange} />

      <Email handleChanges={handleChange} />

      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <div>
        <label>Preferred Categories:</label>
        {categories.map(cat => (
          <label key={cat}>
            <input type="checkbox" value={cat} onChange={handleCategoryChange} /> {cat}
          </label>
        ))}
      </div>
      <select name="theme" onChange={handleChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input name="reminderTime" placeholder="Daily Reminder Time (HH:MM)" onChange={handleChange} />
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