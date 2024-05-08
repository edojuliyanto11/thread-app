/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";

const API_URL = "https://forum-api.dicoding.dev/v1";

export const fetchThreads = async () => {
  const response = await axios.get(`${API_URL}/threads`);
  return response.data.data.threads;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data.data.users;
};

export const fetchThreadsAndUsers = async () => {
  const threads = await fetchThreads();
  const users = await fetchUsers();
  return { threads, users };
};

export const createThread = async (threadData, token) => {
  const response = await axios.post(`${API_URL}/threads`, threadData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchThreadDetail = async (threadId) => {
  const response = await axios.get(`${API_URL}/threads/${threadId}`);
  return response.data.data.detailThread;
};

export const submitComment = async (threadId, newComment, token) => {
  const response = await axios.post(
    `${API_URL}/threads/${threadId}/comments`,
    { content: newComment },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchLeaderboards = async () => {
  const response = await axios.get(`${API_URL}/leaderboards`);
  return response.data.data.leaderboards;
};

export const loginUserAPI = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.status === 200) {
    return response.data.data.token;
  }
  throw new Error(response.data.message || "Login failed");
};

export const registerUserAPI = async ({ name, email, password }) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data.message || "Registration failed");
};
