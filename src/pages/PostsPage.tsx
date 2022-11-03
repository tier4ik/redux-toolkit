import Navigation from "../components/Navigation";
import Posts from "../components/Posts";
import AddPostForm from "../components/Posts/AddPostForm";

const PostsPage = () => {
  return (
    <div className="page">
      <Navigation />
      <AddPostForm />
      <Posts />
    </div>
  );
};

export default PostsPage;
