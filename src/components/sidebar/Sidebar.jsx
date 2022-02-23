import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/chats">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li> */}
          <li className="sidebarListItem">
            <Link to="/groups">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </Link>
          </li>
          {/* <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li> */}
          <li className="sidebarListItem">
            <Link to="/courses">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </Link>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        {/* <hr className="sidebarHr" /> */}
        <div style={{ marginTop: "150%" }}>
          <h1
            style={{ color: "#1877f2", fontSize: "30px", letterSpacing: "2px" }}
          >
            SmartLAD
          </h1>
        </div>
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
