import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./groups.css";

const Cards = ({ group }) => {
  return (
    <div className="cardCont">
      <a href={`groups/${group.title}`}>
        <div className="cardOverlay">
          <img src={group.img} alt={group.title} className="cardImage" />
        </div>
        <h2 className="cardTitle">{group.title}</h2>
        <p className="cardDesc">{group.desc}</p>
      </a>
    </div>
  );
};

const Groups = () => {
  const groupList = [
    {
      title: "Engineering",
      img: "/assets/groups/engineer.jpg",
      desc: "This is engineering group",
    },
    {
      title: "Medical",
      img: "/assets/groups/doctor.jpg",
      desc: "This is medical group",
    },
    {
      title: "Music",
      img: "/assets/groups/music.jpg",
      desc: "This is music group",
    },
    {
      title: "Commerce",
      img: "/assets/groups/commerce.jpg",
      desc: "This is commerce group",
    },
    {
      title: "Art",
      img: "/assets/groups/art.jpg",
      desc: "This is art group",
    },
  ];

  return (
    <div className="groupCont">
      <div className="cont">
        <h1 className="title">Groups</h1>

        <div className="cardsList">
          {groupList.map((group) => {
            return <Cards group={group} />;
          })}
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

        <Groups />
      </div>
    </>
  );
}
