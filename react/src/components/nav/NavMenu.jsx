import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NavPrompt from "./NavPrompt";

const NavMenu = ({ chatLog, setChatLog, setShowMenu }) => {
  return (
      <>
          <h2>Chat History</h2>
          <div className="navPromptWrapper">
              {chatLog.map(
                  (chat, idx) =>
                      chat.botMessage && (
                          <NavPrompt chatPrompt={chat.chatPrompt} key={idx}/>
                      )
              )}
          </div>
          <img
              className="navLogo"
              src="CsAdvisoryBot-icon.png"
              alt="Cs Advisory Bot Logo"
              width="120"
              height="120"
          />
          <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} setShowMenu={setShowMenu}/>
      </>
  );
};

export default NavMenu;
