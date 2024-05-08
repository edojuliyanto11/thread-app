/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import ThreadsPage from "./ThreadsPage";
import "@testing-library/jest-dom/extend-expect";

// Create a mock store with middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Define an initial state for the store
const initialState = {
  threads: {
    threads: [],
    users: [],
    isLoading: true,
    loadingProgress: 50, // Set the loading progress to 50% for testing
  },
};

// Create a store instance with the initial state
const store = mockStore(initialState);

// Describe the test suite for the ThreadsPage component
describe("ThreadsPage Component", () => {
  test("renders loading progress when the component is loading", () => {
    // Render the ThreadsPage component within a Redux Provider and MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadsPage />
        </MemoryRouter>
      </Provider>
    );

    // Check if the loading bar is rendered with the correct width
    const loadingBar = screen.getByRole("status"); // Assuming the loading bar has an appropriate role
    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toHaveStyle({ width: "50%" });
  });

  test("renders 'Create' button when a token is present", () => {
    // Set token in localStorage
    localStorage.setItem("token", "some-token");

    // Render the ThreadsPage component within a Redux Provider and MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadsPage />
        </MemoryRouter>
      </Provider>
    );

    // Check if the "Create" button is rendered
    const createButton = screen.getByText(/create/i);
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveClass("create-thread-button");

    // Clear the token from localStorage
    localStorage.removeItem("token");
  });
});
