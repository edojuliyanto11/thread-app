import React from 'react';
import LoginForm from './components/LoginForm';

export default function Login() {
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
        <LoginForm />
      </div>
    </React.StrictMode>
  );
}
