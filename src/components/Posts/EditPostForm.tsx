import { useState } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../../store/store";
import { selectAllUsers } from "../users/usersSlice";
import {
  deletePost,
  PostStateType,
  selectPostById,
  updatePost,
} from "./postsSlice";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch: () => AppDispatch = useDispatch;

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const receivedPost = useAppSelector((state) => selectPostById(state, id));
  const users = useAppSelector(selectAllUsers);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(receivedPost?.title);
  const [content, setContent] = useState(receivedPost?.content);
  const [authorId, setAuthorId] = useState(receivedPost?.authorId);
  const [requestStatus, setRequestStatus] = useState<"idle" | "pending">(
    "idle"
  );

  if (!receivedPost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContent(e.currentTarget.value);
  };
  const onAuthorChanged: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setAuthorId(e.currentTarget.value);
  };

  const canSave =
    [title, content, authorId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: receivedPost.id,
            title,
            content,
            authorId,
          } as PostStateType)
        ).unwrap();
        setTitle("");
        setContent("");
        setAuthorId("");
        navigate("/posts");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost(receivedPost.id)).unwrap();
      setTitle("");
      setContent("");
      setAuthorId("");
      navigate("/posts");
    } catch (error) {
      console.error("Failed to save the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={authorId} onChange={onAuthorChanged}>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
