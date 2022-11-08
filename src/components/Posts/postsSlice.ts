import {
  createSlice,
  createAsyncThunk,
  nanoid,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export type PostStateType = {
  id: string;
  title: string;
  content: string;
  authorId?: string;
};

type ReceivedPostType = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

// const initialState: PostsStateType = [
//   {
//     id: "1",
//     title: "Learning Redux Toolkit",
//     content: "I've heard good things.",
//   },
//   {
//     id: "2",
//     title: "Slices...",
//     content: "The more I say slice, the more I want pizza.",
//   },
// ];

type StateStatusType = "idle" | "loading" | "succeeded" | "failed";

type InitialStateType = {
  posts: PostStateType[];
  status: StateStatusType;
  error: null | string;
};

const initialState: InitialStateType = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(POSTS_URL);
  if (!response.ok) {
    return Promise.reject("Something went wrong");
  }
  return await response.json();
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: PostStateType) => {
    const response = await fetch(POSTS_URL, {
      method: "post",
      body: JSON.stringify(initialPost),
    });
    if (!response.ok) {
      return Promise.reject("Something went wrong");
    }
    const newId = await response.json();
    return {
      ...initialPost,
      id: newId.id,
    };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostStateType>) => {
        state.posts.unshift(action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<ReceivedPostType[]>) => {
          state.status = "succeeded";
          const newPosts = action.payload.map((post) => {
            return {
              id: post.id,
              title: post.title,
              content: post.body,
              authorId: post.userId,
            };
          });
          state.posts = state.posts.concat(newPosts);
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(
        addNewPost.fulfilled,
        (state, action: PayloadAction<PostStateType>) => {
          console.log("====================================");
          console.log(action.payload);
          console.log("====================================");
          state.posts.unshift(action.payload);
        }
      );
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

// export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
