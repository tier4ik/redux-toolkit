import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

type PostStateType = {
  id: string;
  title: string;
  content: string;
  authorId?: string;
};

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
      reducer: (state, action: PayloadAction<PostStateType>) => {
        state.posts.push(action.payload);
      },
      prepare: (title: string, content: string, authorId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            authorId,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state: RootState): PostStateType[] =>
  state.posts.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
