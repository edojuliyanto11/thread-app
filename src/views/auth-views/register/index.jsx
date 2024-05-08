import React from 'react';
import RegisterForm from './components/RegisterForm';

export default function Register() {
  return (
    <React.StrictMode>
      <div
        style={{
          fontFamily: 'sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#2c3e50',
          color: 'white',
        }}
      >
        <RegisterForm />
      </div>
    </React.StrictMode>
  );
}
