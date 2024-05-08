/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setTitle,
  setBody,
  setCategory,
} from "../../../../features/threadCreatePage/createThreadSlice";
import "../../../../styles/CreateThreadForm.css";
import { createThread } from "../../../../api/api";

function CreateThreadForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, body, category } = useSelector((state) => state.createThread);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const threadData = {
      title,
      body,
      category,
    };

    try {
      const data = await createThread(threadData, token);

      if (data.status === "success") {
        navigate("/threads");
      } else {
        console.error("Error creating thread:", data.message);
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleClickBackButton = () => {
    navigate("/threads");
  };

  return (
    <React.StrictMode>
      <button className="back-button" onClick={handleClickBackButton}>
        Back
      </button>
      <div className="create-thread-form">
        <h3>Create a New Thread</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => dispatch(setBody(e.target.value))}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category (optional):</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="form-control"
            />
          </div>
          <button type="submit" className="submit-button">
            Create
          </button>
        </form>
      </div>
    </React.StrictMode>
  );
}

export default CreateThreadForm;
