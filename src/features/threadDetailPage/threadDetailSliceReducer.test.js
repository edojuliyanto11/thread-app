/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
import { configureStore } from "@reduxjs/toolkit";
import threadDetailSlice, {
  setNewComment,
  setIsAuthenticated,
} from "./threadDetailSlice";
import { describe, it, expect, beforeEach } from "vitest";

describe("threadDetailSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: threadDetailSlice });
  });

  it("should handle setNewComment", () => {
    const initialState = { ...store.getState() };
    const newComment = "This is a new comment";

    // Dispatch action
    store.dispatch(setNewComment(newComment));

    // Get updated state
    const state = store.getState();

    // Assert that the new comment has been set correctly
    expect(state.newComment).toEqual(newComment);
  });

  it("should handle setIsAuthenticated", () => {
    const initialState = { ...store.getState() };
    const isAuthenticated = true;

    // Dispatch action
    store.dispatch(setIsAuthenticated(isAuthenticated));

    // Get updated state
    const state = store.getState();

    // Assert that the isAuthenticated has been set correctly
    expect(state.isAuthenticated).toEqual(isAuthenticated);
  });
});
