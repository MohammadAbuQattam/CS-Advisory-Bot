import React from "react";
import NavLinks from "./NavLink";

const NavLinksContainer = ({ chatLog, setChatLog ,setShowMenu}) => {
  return (
    <div className="navLinks" style={{ position: "absolute", bottom: "10px" }}>
      {chatLog.length > 0 && (
        <NavLinks
          svg={
            <svg
              fill="#fff"
              viewBox="0 0 24 24"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line"
              stroke="#fff"
              width={23}
              height={23}
            >
              <path
                d="M5 8h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5V8Z"
                transform="rotate(90 12 14)"
                style={{
                  fill: "#fff202022",
                  strokeWidth: 2,
                }}
              />
              <path
                d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                style={{
                  fill: "none",
                  stroke: "#fff202022000000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
              <path
                data-name="primary"
                d="M10 11v6m4-6v6M4 7h16m-2 13V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1Z"
                style={{
                  fill: "none",
                  stroke: "#fff202022000000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
            </svg>
          }
          text="Clear Conversation"
          setChatLog={setChatLog}
          setShowMenu={setShowMenu}
        />
      )}
      <NavLinks
        svg={
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={25}
            height={25}
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5m-6 0 7.5-7.5M15 3h6v6"
            />
          </svg>
        }
        text="Updates & FAQ"
        link="https://help.openai.com/en/collections/3742473-chatgpt"
        setShowMenu={setShowMenu}
      />
      <NavLinks
        svg={
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            style={{ marginLeft: "4px" }}
          >
            <path
              d="m16 17 5-5m0 0-5-5m5 5H9m0-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21H9"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        text="Log out"
        link=""
        setShowMenu={setShowMenu}
      />
    </div>
  );
};

export default NavLinksContainer;
