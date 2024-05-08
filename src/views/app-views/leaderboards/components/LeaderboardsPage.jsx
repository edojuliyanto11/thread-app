/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaderboards,
  setLoadingProgress,
} from "../../../../features/leaderboardsPage/leaderboardsSlice";
import "../../../../styles/LeaderboardsPage.css";

function LeaderboardsPage() {
  const dispatch = useDispatch();

  const { leaderboards, loading, loadingProgress, error } = useSelector(
    (state) => state.leaderboards
  );

  useEffect(() => {
    dispatch(fetchLeaderboards());
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      dispatch(setLoadingProgress(progress));
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (error) {
    return (
      <div className="error">
        Error:
        {error}
      </div>
    );
  }

  return (
    <React.StrictMode>
      {loading ? (
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      ) : (
        <div className="leaderboards-container">
          <h2 className="leaderboards-title">Leaderboards</h2>
          <ul className="leaderboards-list">
            {leaderboards.map((entry) => (
              <li key={entry.user.id} className="leaderboards-item">
                <img
                  src={entry.user.avatar}
                  alt={`${entry.user.name}'s avatar`}
                  className="leaderboards-avatar"
                />
                <div className="leaderboards-info">
                  <p className="leaderboards-name">{entry.user.name}</p>
                  <p className="leaderboards-score">
                    Score:
                    {entry.score}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.StrictMode>
  );
}

export default LeaderboardsPage;
