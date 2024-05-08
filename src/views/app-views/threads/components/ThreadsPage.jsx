/* eslint-disable import/order */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../../styles/ThreadPage.css";
import {
  fetchThreadsAndUsers,
  setLoadingProgress,
} from "../../../../features/threadsPage/threadsPageSlice";

function ThreadsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { threads, users, isLoading, loadingProgress } = useSelector(
    (state) => state.threads
  );

  useEffect(() => {
    dispatch(fetchThreadsAndUsers());
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      dispatch(setLoadingProgress(progress));
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleThreadClick = (threadId) => {
    navigate(`/threads/${threadId}`);
  };

  const handleCreateButtonClick = () => {
    navigate("/create");
  };

  const findOwner = (ownerId) => users.find((user) => user.id === ownerId);

  return (
    <React.StrictMode>
      <div className="threads-container">
        {token && (
          <button
            className="create-thread-button"
            onClick={handleCreateButtonClick}
            style={{
              display: "block",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "15px",
              margin: "auto",
              width: "100px",
              margin: "10px 0px 10px 655px",
            }}
          >
            Create
          </button>
        )}
        {isLoading ? (
          <div className="loading-bar-container">
            <div
              className="loading-bar"
              style={{ width: `${loadingProgress}%` }}
              role="status"
            />
          </div>
        ) : (
          <>
            {threads.length > 0 ? (
              <ul className="threads-list">
                {threads.map((thread) => {
                  const owner = findOwner(thread.ownerId);
                  return (
                    <li
                      key={thread.id}
                      className="thread-item"
                      onClick={() => handleThreadClick(thread.id)}
                    >
                      {owner && (
                        <div className="thread-owner">
                          <img
                            src={owner.avatar}
                            alt={owner.name}
                            className="owner-avatar"
                          />
                          <span className="owner-name">{owner.name}</span>
                        </div>
                      )}
                      <h2 className="thread-title">{thread.title}</h2>
                      <p className="thread-body">{thread.body}</p>
                      <br />
                      <span className="thread-detail-category-tag">
                        {thread.category}
                      </span>
                      <p className="thread-detail-createdAt">
                        <span className="createdAt-icon">🕒</span>
                        {new Date(thread.createdAt).toLocaleString()}
                        <span>
                          💬
                          {thread.totalComments}
                        </span>
                      </p>

                      <div className="comment-actions">
                        <span>
                          👍
                          {thread.upVotesBy.length}
                        </span>
                        <span>
                          👎
                          {thread.downVotesBy.length}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="no-threads">No threads available.</p>
            )}
          </>
        )}
      </div>
    </React.StrictMode>
  );
}

export default ThreadsPage;
