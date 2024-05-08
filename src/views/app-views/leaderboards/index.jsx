import React from 'react';
import LeaderboardsPage from './components/LeaderboardsPage';

function Leaderboards() {
  return (
    <React.StrictMode>
      <div
        style={{
          fontFamily: 'sans-serif',
        }}
      >
        <LeaderboardsPage />
      </div>
    </React.StrictMode>
  );
}

export default Leaderboards;
