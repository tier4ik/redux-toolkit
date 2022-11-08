import { useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";

// import { postAdded } from "./postsSlice";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddPostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [addRequestStatus, setAddRequestStatus] = useState<"idle" | "pending">(
    "idle"
  );
  const users = useAppSelector(selectAllUsers);

  const isDisabled =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const dispatch = useAppDispatch();

  const onTitleChanged: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.currentTarget.value);

  const onContentChanged: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.currentTarget.value);

  const onAuthorChanged: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setUserId(e.currentTarget.value);

  const onSavePostClicked = () => {
    if (isDisabled) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({ title, content, authorId: userId, id: "" })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save new post", err);
      } finally {
        setAddRequestStatus("idle");
      }
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
