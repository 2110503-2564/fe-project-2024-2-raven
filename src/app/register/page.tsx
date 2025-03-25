// src/app/register/page.tsx
'use client'; // Important: Use client-side rendering for interactivity

import RegisterForm from '../../components/RegisterForm'; // Adjust the path as needed

export default function RegisterPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; // Get API URL from env

  return (
    <div>
      <h1>Register</h1>
      <RegisterForm apiUrl={apiUrl} />
    </div>
  );
}