import "../styles/Post.css";
import NavBar from "./NavBar";
import images from "../assets/navBar/images.png";

const Post = (props) => {
  const uploadFile = (e) => { //RUNS TWICE, html overlaps
    const img = document.querySelector('.imgUpload')
    img.click()
  };

  const updateFile = () => {
    console.log('updated files')
  }
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("file dropped")
    if (e.target.className === "uploadForm") {
      return (e.target.style.backgroundColor = "white");
    }
  };

  const dragEnter = (e) => {
    const div = e.target;
    if (div.className === "uploadForm")
      return (div.style.backgroundColor = "lightgray");
  };

  const dragExit = (e) => {
    const div = e.target;
    if (div.className === "uploadForm")
      return (div.style.backgroundColor = "white");
  };

  return (
    <div className="postPage" aria-label="postPage">
      <NavBar signOut={props.signOut} />
      <div className="createPost">
        <span>Create new post</span>
        <form
          onDrop={dropHandler}
          onDragEnter={dragEnter}
          onDragLeave={dragExit}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={(e)=> {e.preventDefault()}}
          className="uploadForm"
        >
          <img src={images} className="uploadImg" />
          Drag photos and videos here
          <button
            className="customUpload"
            type='button'
            onClick={uploadFile}
            >
            Select from your computer
            <input
              type="file"
              className="imgUpload"
              onChange={updateFile}
              style={{ display: "none" }}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
