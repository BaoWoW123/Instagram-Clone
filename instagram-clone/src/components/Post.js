import "../styles/Post.css";
import NavBar from "./NavBar";

const Post = (props) => {
  return (
    <div className="Post">
      <NavBar signOut={props.signOut}/>
      <h1>Post</h1>
    </div>
  );
};

export default Post;
