import { Link } from "react-router-dom";
import type { PostStateType } from "./postsSlice";
import PostAuthor from "./PostAuthor";

import style from "./Posts.module.css";

type Props = {
  post: PostStateType;
};

const PostsExcerpt: React.FC<Props> = ({ post }) => {
  return (
    <article className={style.post}>
      <h2 className={style.post__header}>{post.title}</h2>
      <p className={style.post__content}>
        {post.content.length > 100
          ? `${post.content.substring(0, 100)}...`
          : post.content}
      </p>
      <PostAuthor userId={post.authorId} />
      <br />
      <Link to={`/posts/${post.id}`}>View post</Link>
    </article>
  );
};

export default PostsExcerpt;
