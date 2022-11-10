import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { RootState } from "../../store/store";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const SinglePost = () => {
  let { id } = useParams();

  const receivedPost = useAppSelector((state) => selectPostById(state, id));

  let content: JSX.Element;

  if (!receivedPost) {
    content = <h2>Post not found</h2>;
  } else {
    content = (
      <article className="post">
        <h2>{receivedPost.title}</h2>
        <p>{receivedPost.content}</p>
        <PostAuthor userId={receivedPost.authorId} />
        <br />
        <Link to={`/post/edit/${receivedPost.id}`}>Edit post</Link>
      </article>
    );
  }

  return <div>{content}</div>;
};

export default SinglePost;
