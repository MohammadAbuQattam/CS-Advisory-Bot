import React from "react";
import BotResponse from "./BotResponse";

const IntroSection = ({setGlobalIsPrinting}) => {
  return (
    <div id="introsection">
      <h1>
        Introducing CS Advisory Bot
        <BotResponse
            response=" - Your Ultimate AI Assistant"
            setGlobalIsPrinting={setGlobalIsPrinting}
        />
      </h1>
      <h2>
          I am CS Advisory Bot, the dedicated chatbot for the computer science department at the King Abdullah II
          School of Information Technology, University of Jordan. I'm here to help with information specific
          to the computer science curriculum. Feel free to ask me anything related to the courses offered by
          the department or academic plans for computer science students.
      </h2>
      <p>
        Say goodbye to endless searching and typing, and say hello to CS Advisory Bot,
        your personal AI assistant. Try it now and see for yourself how CS Advisory Bot
        can make your life easier.
      </p>
    </div>
  );
};

export default IntroSection;
