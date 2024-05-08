import React from 'react';

function Navbar() {
  return (
    <React.StrictMode>
      {' '}
      <header
        style={{
          padding: '10px',
          position: 'none',
          width: '100%',
          background: 'orange',
        }}
      >
        <h2 style={{ margin: 0, textAlign: 'center' }}>Threads App</h2>
      </header>
    </React.StrictMode>
  );
}

export default Navbar;
