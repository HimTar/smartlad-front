import { useState, useEffect, useContext } from "react";

import { Avatar } from "@material-ui/core";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

function padValue(value) {
  return value < 10 ? "0" + value : value;
}

function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sMonth +
    "/" +
    sDay +
    "/" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

const Cards = ({ data }) => {
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div className="userCardCont">
      <div className="userCardOverlay">
        <Avatar
          src={
            data.receiver.profilePicture
              ? data.receiver.profilePicture
              : "https://placehold.jp/24/cccccc/ffffff/100x100.png?text=" +
                data.receiver.username[0]
          }
          alt={data.receiver.username}
          // className="userCardImage"
        />
        <h2 className="userCardTitle">{capitalize(data.receiver.username)}</h2>
      </div>
      <p className="userCardDesc">
        {capitalize(data.receiver.username)} is a {data.receiver.role}
      </p>

      <h4>Last Message Sent</h4>
      <p
        style={{
          fontSize: "0.7rem",
          marginTop: "0.5rem",
          marginLeft: "1rem",
          color: "#5d5d5d",
        }}
      >
        {data.text}
      </p>
      <p
        style={{
          fontSize: "0.7rem",
          marginTop: "0.5rem",
          marginLeft: "1rem",
          color: "#5d5d5d",
        }}
      >
        {formatDate(data.time)}
      </p>

      <button
        className="button"
        onClick={() =>
          (window.location = `/private/${data.receiver._id}/${data.receiver.username}`)
        }
      >
        Start Chatting
      </button>
    </div>
  );
};

const ChatList = () => {
  const [list, setList] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/chats/get-private-chat-list", {
        params: { username: user._id },
      });
      setList(data.list);
    } catch {}
  };

  useEffect(() => fetchData(), []);

  return (
    <div className="groupCont">
      <h1 style={{ margin: "1rem" }}>Personal chats</h1>

      <div className="cont" style={{ display: "flex" }}>
        {list.map((item) => (
          <Cards data={item} key={item._id} />
        ))}
      </div>

      {list.length === 0 && (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No chats yet ..
        </div>
      )}
    </div>
  );
};

export default function Chats() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />

        <ChatList />
      </div>
    </>
  );
}
