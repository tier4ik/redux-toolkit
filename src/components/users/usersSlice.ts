import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

type User = {
  id: string;
  name: string;
  username: string;
};

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(USERS_URL);
  if (!response.ok) {
    return Promise.reject("Something went wrong");
  }
  return await response.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // with return we are completely overwriting the state
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: RootState): User[] => state.users;

export default usersSlice.reducer;
