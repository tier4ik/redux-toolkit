import { useSelector, TypedUseSelectorHook } from "react-redux";

import { RootState } from "../../store/store";

import { selectAllUsers } from "../users/usersSlice";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type props = {
  userId?: string;
};

const PostAuthor: React.FC<props> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find((user) => `${user.id}` === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
