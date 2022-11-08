import { useEffect } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

const Posts = (): JSX.Element => {
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const postsError = useAppSelector(getPostsError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content: JSX.Element;

  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  } else {
    content = (
      <div className="posts">
        {posts.map((post) => (
          <PostsExcerpt key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default Posts;
