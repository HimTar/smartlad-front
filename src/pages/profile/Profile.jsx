import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import interests from "../../utils/interests";

const UploadControl = ({ children, name, value, onChange, accept }) => {
  return (
    <label htmlFor={name} className="button">
      <input
        value={value}
        accept={accept}
        style={{ display: "none" }}
        id={name}
        type="file"
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [myInt, setMyInt] = useState([]);
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");

  const { username } = useParams();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/auth/get-my-profile?username=${username}`);
      setUser(res.data.userData);
      setMyInt(res.data.userData.tags);
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  const handleInterest = (int) => {
    const removeVal = (arr, val) => {
      const newVal = arr.filter((v) => v !== val);
      return newVal;
    };

    let currentInt = [...myInt];

    if (currentInt.includes(int)) {
      setMyInt(removeVal(currentInt, int));
    } else {
      setMyInt([...currentInt, int]);
    }
  };

  const handleProfile = ({ target: { files } }) => {
    const loadedImage = files[0];
    setProfile(loadedImage);
  };

  const handleCover = ({ target: { files } }) => {
    const loadedImage = files[0];
    setCover(loadedImage);
  };

  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("file", img);

    const { data } = await axios.post("/upload", formData);

    return data.body.link;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: user.username,
      tags: myInt,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
    };

    if (profile) {
      data["profilePicture"] = await uploadImage(profile);
    }

    if (cover) {
      data["coverPicture"] = await uploadImage(cover);
    }

    await axios.post("/auth/update-profile", data);

    alert("Profile Updated !");
    fetchUser();
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />

              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : process.env.PUBLIC_URL + "/assets/person/8.jpeg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="profileRightBottom">
            <h1 className="profileTitle">User Information</h1>
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                required
                value={user.username}
                className="loginInput"
                disabled
              />
              <input
                placeholder="Email"
                required
                value={user.email}
                className="loginInput"
                type="email"
                disabled
              />
              <select
                required
                value={user.role}
                className="loginInput"
                disabled
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="professional">Professional</option>
              </select>

              <h1 className="profileTitle">My Interests</h1>

              <div className="interestTab">
                {interests.map((int) => {
                  return (
                    <p
                      className={
                        myInt.includes(int) ? "interest-selected" : "interest"
                      }
                      onClick={() => handleInterest(int)}
                    >
                      {int}
                    </p>
                  );
                })}
              </div>

              <UploadControl
                name="profile"
                onChange={handleProfile}
                accept="image/*"
              >
                Change Profile Image
              </UploadControl>

              <UploadControl
                name="cover"
                onChange={handleCover}
                accept="image/*"
              >
                Change Cover Image
              </UploadControl>

              <button className="loginButton" type="submit">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
