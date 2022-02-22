import { useEffect, useContext, useState } from "react";
import { Avatar } from "@material-ui/core";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Cards = ({ data }) => {
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div className="userCardCont">
      <div
        className="userCardOverlay"
        onClick={() => (window.location = `/profile/${data.username}`)}
      >
        <Avatar
          src={
            data.profilePicture
              ? data.profilePicture
              : "https://placehold.jp/24/cccccc/ffffff/100x100.png?text=" +
                data.username[0]
          }
          alt={data.username}
          // className="userCardImage"
        />
        <h2 className="userCardTitle">{capitalize(data.username)}</h2>
      </div>
      <p className="userCardDesc">
        {capitalize(data.username)} is a {data.role}
      </p>

      <div className="userTags">
        {data.tags.map((tag, ind) => {
          return <p className={"interest"}>{tag}</p>;
        })}
      </div>
    </div>
  );
};

const Network = () => {
  const [follower, setFoll] = useState([]);
  const [following, setFolli] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/auth/network/" + user.username);

      setFoll(data.followers);
      setFolli(data.following);
      setSuggestion(data.suggestion.reverse());
    };

    fetchData();
  }, []);

  return (
    <div className="groupCont">
      <div className="cont">
        <h1 className="title">My Network</h1>

        <h3 className="subTitle">Connect with new people</h3>
        <div className="cardsList">
          {suggestion.map((foll, ind) => (
            <Cards data={foll} key={ind} />
          ))}
        </div>

        <h3 className="subTitle">My Connections</h3>
        <div className="cardsList">
          {following.map((foll, ind) => (
            <Cards data={foll} key={ind} />
          ))}
        </div>

        <h3 className="subTitle">My Followers</h3>
        <div className="cardsList">
          {follower.map((foll, ind) => (
            <Cards data={foll} key={ind} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MainCont() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <Network />
      </div>
    </>
  );
}
