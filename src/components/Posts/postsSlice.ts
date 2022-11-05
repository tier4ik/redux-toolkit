import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

type PostsStateType = {
  id: string;
  title: string;
  content: string;
}[];

const initialState: PostsStateType = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostsStateType[number]>) => {
        state.push(action.payload);
      },
      prepare: (title: string, content: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state: RootState): PostsStateType => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
