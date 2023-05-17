import "../styles/Post.css";
import NavBar from "./NavBar";
import uploadIcon from "../assets/navBar/images.png";
import { database } from "../firebase";
import Cropper from "react-easy-crop";
import { useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getCountFromServer,
} from "firebase/firestore";

//CAN ONLY POST ONE FILE
const Post = (props) => {
  let [crop, setCrop] = useState({ x: 0, y: 0 });
  let [zoom, setZoom] = useState(1);
  let [imgCrop, setImgCrop] = useState(null);
  let [imgPixels, setImgPixels] = useState({});

  const uploadFile = async (e) => {
    const img = document.querySelector(".imgUpload");
    img.click();
  };

  const editFile = async (e) => {
    const img = document.querySelector(".imgUpload");
    if (img.files.length) {
      const uploadForm = document.querySelector(".uploadForm");
      const imgEdit = document.querySelector(".imgEdit");
      uploadForm.className = "uploadForm hidden";
      imgEdit.className = "imgEdit";
      await setImgCrop(URL.createObjectURL(img.files[0]));
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className === "uploadForm") {
      e.target.style.backgroundColor = "white";
    }
    const img = document.querySelector(".imgUpload");
    img.files = e.dataTransfer.files; //input switches files, doesnt add onto files
    editFile();
  };

  const dragEnter = (e) => {
    const div = e.target;
    if (div.className === "uploadForm")
      return (div.style.backgroundColor = "lightgray");
  };

  const dragExit = (e) => {
    const div = e.target;
    if (div.className === "uploadForm")
      return (div.style.backgroundColor = "transparent");
  };

  const sharePost = async () => {
    let img = new Image();
    img.src = imgCrop;
    const imgEdit = document.querySelector(".imgEdit");
    const imgEditFinal = document.querySelector(".imgEditFinal");
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const captionInput = document.querySelector(".captionInput").value;

    imgEdit.className = "imgEdit hidden";
    imgEditFinal.className = "imgEditFinal";

    await ctx.drawImage(
      img,
      imgPixels.x, imgPixels.y, //START OF X, Y (Y is opposite)
      imgPixels.width, imgPixels.height, // EXPANDS TO RIGHT X AMOUNT, DOWN Y AMOUNT
      0, 0, // WHERE TO PLACE CROP
      600, 450
    );

    const canvasURL = canvas.toDataURL();

    const postsRef = collection(database, "users", props.user.uid, "posts");
    const snapshot = await getCountFromServer(postsRef);
    const postsCount = `${snapshot.data().count + 1}`;
    
    await setDoc(
      doc(database, "users", props.user.uid, "posts", `${postsRef.parent.id}-post${postsCount}`),
      {
        postId: `${postsRef.parent.id}-post${postsCount}`,
        postImg: canvasURL,
        caption: captionInput,
        date: new Date().toLocaleTimeString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        id: "testUser1",
      },
      { merge: true }
    );
  };

  const onCropComplete = (croppedArea, cropperAreaPx) => {
    setImgPixels(cropperAreaPx);
  };

  const resetPostPage = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImgCrop(null);
    setImgPixels({});
    const imgEditFinal = document.querySelector(".imgEditFinal");
    const uploadForm = document.querySelector(".uploadForm");
    const captionInput = document.querySelector(".captionInput");
    captionInput.value = "";
    uploadForm.className = "uploadForm";
    imgEditFinal.className = "imgEditFinal hidden";
  };
  return (
    <div className="postPage" aria-label="postPage">
      <NavBar signOut={props.signOut} userInfo={props.userInfo} />
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
          onChange={(e) => {
            e.preventDefault();
          }}
          className="uploadForm"
        >
          <img src={uploadIcon} className="uploadImg" />
          Drag photos and videos here
          <button className="customUpload" type="button" onClick={uploadFile}>
            Select from your computer
          </button>
          <input
            type="file"
            className="imgUpload"
            onChange={editFile}
            style={{ display: "none" }}
            accept="image/*"
          />
        </form>
        <div className="imgEdit hidden">
          <div className="imgPreviewWrapper">
            <Cropper
              image={imgCrop}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div>
            <textarea
              className="captionInput"
              placeholder="Write your caption here..."
              maxLength="100"
            />
            <button type="button" className="postBtn" onClick={sharePost}>
              Share
            </button>
          </div>
        </div>
        <div className="imgEditFinal hidden">
          <span>Post shared!</span>
          <canvas width={600} height={450}></canvas>
          <button type="button" onClick={resetPostPage}>
            Create another post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
