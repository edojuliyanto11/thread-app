import React from 'react';
import ThreadsPage from './components/ThreadsPage';

function Threads() {
  return (
    <React.StrictMode>
      <div
        style={{
          fontFamily: 'sans-serif',
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <ThreadsPage />
      </div>
    </React.StrictMode>
  );
}

export default Threads;
