/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
import { configureStore } from "@reduxjs/toolkit";
import threadsReducer from "../features/threadsPage/threadsPageSlice";
import createThreadReducer from "../features/threadCreatePage/createThreadSlice";
import threadDetailReducer from "../features/threadDetailPage/threadDetailSlice";
import leaderboardsReducer from "../features/leaderboardsPage/leaderboardsSlice";
import authReducer from "../features/login/authLoginSlice";
import registerReducer from "../features/register/authRegisterSlice";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    createThread: createThreadReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    auth: authReducer,
    register: registerReducer,
  },
});

export default store;
