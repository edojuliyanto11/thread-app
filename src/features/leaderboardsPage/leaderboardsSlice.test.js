/* eslint-disable linebreak-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/order */
/* eslint-disable quotes */
import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchLeaderboards } from "../../features/leaderboardsPage/leaderboardsSlice";
import { thunk } from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock axios
vi.mock("axios");

describe("fetchLeaderboards Thunk Function", () => {
  it("should dispatch the correct actions on successful API call", async () => {
    // Mock response data
    const mockLeaderboards = [
      { user: { name: "Dimas Saputra" }, score: 25 },
      { user: { name: "Dicoding" }, score: 0 },
    ];
    axios.get.mockResolvedValueOnce({
      data: { data: { leaderboards: mockLeaderboards } },
    });

    // Create a mock store
    const store = mockStore({ leaderboards: [] });

    // Dispatch the thunk action
    await store.dispatch(fetchLeaderboards());

    // Verify the actions dispatched
    const actions = store.getActions();
    expect(actions[0].type).toBe("leaderboards/fetchLeaderboards/pending");
    expect(actions[1].type).toBe("leaderboards/fetchLeaderboards/fulfilled");
    expect(actions[1].payload).toEqual(mockLeaderboards);
  });

  it("should dispatch the correct actions on failed API call", async () => {
    // Mock error response
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    // Create a mock store
    const store = mockStore({ leaderboards: [] });

    // Dispatch the thunk action
    await store.dispatch(fetchLeaderboards());

    // Verify the actions dispatched
    const actions = store.getActions();
    expect(actions[0].type).toBe("leaderboards/fetchLeaderboards/pending");
    expect(actions[1].type).toBe("leaderboards/fetchLeaderboards/rejected");
    expect(actions[1].error.message).toBe("Network error");
  });
});
