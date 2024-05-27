import React, { useEffect } from "react";
import { useState } from "react";

const BotResponse = ({ response, chatLogRef ,setGlobalIsPrinting}) => {
  const [botResponse, setBotResponse] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [currIsPrinting, setCurrIsPrinting] = useState(true);
  const [isManuallyStopped, setIsManuallyStopped] = useState(false);

  useEffect(() => {
    setIsManuallyStopped(false); // reset isManuallyStopped to false when printing starts
    let index = 1;
    let msg = setInterval(() => {
      if (response !== " - Your Ultimate AI Assistant") {
        setIsButtonVisible(true);
      }
      if (!currIsPrinting) {
        setIsButtonVisible(isManuallyStopped); // set isButtonVisible based on isManuallyStopped
        setGlobalIsPrinting(false);
        clearInterval(msg);
        return;
      }
      setBotResponse(response.slice(0, index));
      if (index >= response.length) {
        clearInterval(msg);
        setCurrIsPrinting(false);
        setIsButtonVisible(isManuallyStopped); // set isButtonVisible based on isManuallyStopped
      }
      index++;

      // scroll to the bottom of the page whenever the messages array is updated
      if (chatLogRef !== undefined) {
        chatLogRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 50);
    return () => clearInterval(msg); // clear interval on component unmount
  }, [chatLogRef, response, currIsPrinting]);

  const stopPrinting = () => {
    setCurrIsPrinting(!currIsPrinting);
    setGlobalIsPrinting(!currIsPrinting);
    setIsManuallyStopped(true); // set isManuallyStopped to true when stopped manually
  };

  return (
      <>

      <pre>
        {botResponse}
        {botResponse === response ? "" : "|"}
      </pre>
        {isButtonVisible && (
            <button className="stop-messgage" onClick={stopPrinting}>
              {currIsPrinting ? "Stop Message" : "Regenerate Message"}
            </button>
        )}
      </>
  );
};

export default BotResponse;