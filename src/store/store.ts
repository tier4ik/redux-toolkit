import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/Counter/counterSlice";
import postsReducer from "../components/Posts/postsSlice";
import usersReducer from "../components/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
