import { useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";

import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddPostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const users = useAppSelector(selectAllUsers);

  const dispatch = useAppDispatch();

  const onTitleChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.currentTarget.value);

  const onContentChanged: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.currentTarget.value);

  const onAuthorChanged: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setUserId(e.currentTarget.value);

  const isDisabled = Boolean(title) && Boolean(content) && Boolean(userId);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="authors">Authors:</label>
        <select
          name="users"
          id="authors"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value="">Select an author</option>
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
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!isDisabled}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
