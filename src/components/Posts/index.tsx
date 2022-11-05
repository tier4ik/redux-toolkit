import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store/store";
import { selectAllPosts } from "./postsSlice";

import PostAuthor from "./PostAuthor";

import style from "./Posts.module.css";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Posts = (): JSX.Element => {
  const posts = useAppSelector(selectAllPosts);
  return (
    <section>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id} className={style.post}>
          <h2 className={style.post__header}>{post.title}</h2>
          <p className={style.post__content}>
            {post.content.substring(0, 100)}
          </p>
          <PostAuthor userId={post.authorId} />
        </article>
      ))}
    </section>
  );
};

export default Posts;
