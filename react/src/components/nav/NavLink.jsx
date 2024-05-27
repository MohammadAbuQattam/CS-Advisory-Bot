import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const NavLinks = ({ svg, link, text, setChatLog, setShowMenu }) => {
  const { dispatch } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

  const handleClick = async (text) => {
    if (text === "Clear Conversation") {
      setChatLog([]);
      setShowMenu(false);
    }
    if (text === "Log out") {
      try {
        await logout();
        dispatch({ type: "LOGOUT" });
      } catch (error) {
        console.log("error happen during sign out", error);
      }
    }
  };
  const logout = async () => {
    await axios.post('/chat/logout', JSON.stringify({
      user: currentUser
    }));
  };
  return (
    <Link
      to={link}
      target={link && "_blank"}
      rel="noreferrer"
      style={{ textDecoration: "none" }}
      onClick={() => handleClick(text)}
    >
      <div className="navPrompt">
        {svg}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default NavLinks;
