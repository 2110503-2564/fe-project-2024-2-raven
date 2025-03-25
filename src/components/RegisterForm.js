// components/RegisterForm.js
import { useState } from 'react';

export default function RegisterForm({ apiUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    telephone_number: '',
    role: 'user', // Default role
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setSuccessMessage('Registration successful!');
        // Handle successful registration (e.g., redirect, show success message)
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        setErrorMessage(errorData.error || 'Registration failed.');
        // Handle registration error (e.g., show error message)
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error. Please try again.');
      // Handle network error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telephone_number"
        placeholder="Telephone Number"
        value={formData.telephone_number}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        {/* Add more roles as needed */}
      </select>
      <button type="submit">Register</button>
    </form>
  );
}