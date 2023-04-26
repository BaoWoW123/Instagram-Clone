import "../styles/Profile.css";
import NavBar from "./NavBar";
import likes from "../assets/navBar/likes.png";
import comment from "../assets/navBar/comment.png";
import { testImgArr } from "./testImages";
import Cropper from "react-easy-crop";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../firebase";

const Profile = (props) => {
  let [crop, setCrop] = useState({ x: 0, y: 0 });
  let [zoom, setZoom] = useState(1);
  let [profileImgCrop, setProfileImgCrop] = useState(null);
  let [profileImgPixels, setProfileImgPixels] = useState({});

  const showProfilePopup = (e) => {
    console.log("popup");
    const profilePopupWrapper = document.querySelector(".profilePopupWrapper");
    const profilePopupOptions = document.querySelector('.profilePopupOptions')
    if (profilePopupWrapper.className === "profilePopupWrapper") {
      profilePopupWrapper.className = "profilePopupWrapper hidden";
    } else {
      profilePopupWrapper.className = "profilePopupWrapper";
      profilePopupOptions.className = 'profilePopupOptions'
    }
  };

  const selectProfileImg = (e) => {
    console.log("change");
    const imgInput = document.querySelector(".profileImgUpload");

    imgInput.click();
  };

  const updateProfileImg =  async () => {
    const profilePopupOptions = document.querySelector(".profilePopupOptions");
    const profileImgUpload = document.querySelector('.profileImgUpload')
    const cropper = document.querySelector('.profileImgCropperWrapper')
    cropper.className = 'profileImgCropperWrapper'
    profilePopupOptions.className = "profilePopupOptions hidden";
    console.log("img selected");
    if (profileImgUpload.files.length) {
      await setProfileImgCrop(URL.createObjectURL(profileImgUpload.files[0]))
    }

  };

   const createProfileImg = async () => {
    let img = new Image();
    const canvas = document.querySelector(".profileCanvas");
    const ctx = canvas.getContext("2d");
    const profilePopupWrapper = document.querySelector('.profilePopupWrapper')
    const profileImgCropperWrapper = document.querySelector('.profileImgCropperWrapper') 

    img.src = profileImgCrop;
    profilePopupWrapper.className = "profilePopupWrapper hidden";
    profileImgCropperWrapper.className = 'profileImgCropperWrapper hidden'; 


    await ctx.drawImage(
      img,
      profileImgPixels.x, profileImgPixels.y,
      profileImgPixels.width, profileImgPixels.height,
      0,0,
      300,
      150
    );
    
    const canvasURL = canvas.toDataURL('image/png');
    setProfileImgCrop(canvasURL)
    await setDoc(
      doc(database, "users", props.user.uid), {profileImg: canvasURL}
    );
    props.getUserInfo(auth.currentUser)
  };
  const onCropComplete = (croppedArea, cropperAreaPx) => {
    setProfileImgPixels(cropperAreaPx);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      props.setUser(user);
    });

    return unsubscribe();
  }, [])

  return (
    <div className="profilePage" aria-label="Profile">
      <NavBar signOut={props.signOut} userInfo = {props.userInfo}/>
      <div className="profile">
        <div className="profilePopupWrapper hidden">
          <span className="profilePopup">
            <div className="profilePopupOptions">
            <div>
              <h2>Change profile image</h2>
            </div>
            <div onClick={selectProfileImg}>Upload image</div>
            <div onClick={showProfilePopup}>Cancel</div>
            </div>
            <input
              type="file"
              className="profileImgUpload"
              onChange={updateProfileImg}
              style={{ display: "none" }}
              accept="image/*"
            />        
          </span>
          <div className="profileImgCropperWrapper hidden">
              <div>
              <Cropper
                image={profileImgCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape='round'
              />
              </div>
              <button type="button" onClick={createProfileImg}>Save</button>
              <canvas className="profileCanvas hidden"></canvas>
            </div>
        </div>
        <div className="topProfile">
          <img
            src={props.userInfo ? props.userInfo.profileImg : testImgArr[3].img}
            onClick={showProfilePopup}
            style={{position:'top'}}
          />
          <div className="profileInfo">
            <div>
              {props.user.displayName}
              <div className="profileInfoBtns">
                {" "}
                {/* SHOULDN'T DISPLAY ON OWN PROFILE */}
                <button type="button">Follow</button>
                <button type="button">{"v"}</button>
                <button type="button">···</button>
              </div>
            </div>
            <div style={{ display: "flex", padding: "20px 0px", gap: "50px" }}>
              <div>100 posts</div>
              <div>300 followers</div>
              <div>500 following</div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <div>{props.user.displayName}</div>
              <div>Insert bio here</div>
              <div>aWebsite.com</div>
            </div>
          </div>
        </div>
        <div>
          <div className="userPostsNavBar">
            <div>Posts</div>
            <div>Reels</div>
            <div>Videos</div>
            <div>Tagged</div>
          </div>
          <div className="userPosts">
            {testImgArr.map((el, i) => {
              return (
                <div className="userPost" key={i}>
                  <img src={el.img} />
                  <div className="userPostInfo">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={likes} /> {i + 1}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={comment} /> {i + 3}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
