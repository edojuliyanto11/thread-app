/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchThreadDetail,
  submitComment,
  setNewComment,
  setIsAuthenticated,
  setLoadingProgress,
} from "../../../../features/threadDetailPage/threadDetailSlice";
import "../../../../styles/ThreadPageDetail.css";

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { thread, newComment, isAuthenticated, loadingProgress, loading } =
    useSelector((state) => state.threadDetail);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(setIsAuthenticated(!!token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingProgress < 100) {
        dispatch(setLoadingProgress(loadingProgress + 10));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [loadingProgress, dispatch]);

  const handleCommentChange = (event) => {
    dispatch(setNewComment(event.target.value));
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");
    dispatch(submitComment({ threadId, comment: newComment, token }));
  };

  if (!thread) {
    return (
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${loadingProgress}%` }} />
      </div>
    );
  }

  const handleClickBackButton = () => {
    navigate("/threads");
  };

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
        <>
          <button
            style={{
              padding: "8px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              width: "80px",
            }}
            onClick={handleClickBackButton}
          >
            Back
          </button>
          <div className="thread-detail-container">
            <div className="thread-detail-owner">
              {thread && thread.owner && (
                <>
                  <img
                    src={thread.owner.avatar}
                    alt={thread.owner.name}
                    className="thread-detail-owner-avatar"
                  />
                  <span>{thread.owner.name}</span>
                </>
              )}
            </div>
            <h1 className="thread-detail-title">{thread.title}</h1>
            <p className="thread-detail-body">{thread.body}</p>
            <span className="thread-detail-category-tag">
              {thread.category}
            </span>
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
            <span className="createdAt-icon">🕒</span>
            {new Date(thread.createdAt).toLocaleString()}
            <br />
            <br />
            {isAuthenticated ? (
              <div className="comment-input-container">
                <textarea
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                  className="comment-textarea"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="comment-submit-button"
                >
                  Submit
                </button>
              </div>
            ) : (
              <p style={{ textAlign: "center" }}>
                Please <Link to="/login">login</Link> to post a comment
              </p>
            )}
            <div className="thread-comments">
              <h2 style={{ marginBottom: 10 }}>
                Comments ({thread.comments.length})
              </h2>
              {thread.comments.length > 0 ? (
                thread.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-owner">
                      {comment.owner && (
                        <>
                          <img
                            src={comment.owner.avatar}
                            alt={comment.owner.name}
                            className="comment-owner-avatar"
                          />
                          <span>{comment.owner.name}</span>
                        </>
                      )}
                    </div>
                    <br />
                    <p className="comment-content">{comment.content}</p>
                    <br />
                    <div className="comment-actions">
                      <span>
                        👍
                        {comment.upVotesBy.length}
                      </span>
                      <span>
                        👎
                        {comment.downVotesBy.length}
                      </span>
                    </div>
                    <span className="createdAt-icon">🕒</span>
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </React.StrictMode>
  );
}

export default ThreadDetailPage;
