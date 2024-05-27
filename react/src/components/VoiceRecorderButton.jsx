import '../App.css';
import { FaMicrophone } from 'react-icons/fa';
import {useState} from "react";

const VoiceRecorderButton = ({ setInputPrompt,textAreaRef }) => {
    const [isRecording, setIsRecording] = useState(false);
    // eslint-disable-next-line no-undef
    const recognition = new webkitSpeechRecognition();

    recognition.lang = 'en-US'
    recognition.continuous = true;
    recognition.interimResults = true;


    if(!("webkitSpeechRecognition" in window)){
        return <div>Speech Recognition is not available</div>
    }

    recognition.onresult = (e) =>{
        console.log('success')
        console.log('onresult event', e);
        //recognition.stop();
        const text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
        textAreaRef.current.value = text;
    }



    recognition.onspeechend = () => {
        recognition.stop();
        console.log('recognition stopped');
        setIsRecording(prevState => {
            return false;
        });
    }

    const handleButtonClick = () => {
        if (isRecording) {
            recognition.stop();
            console.log('recognition stopped');
            setIsRecording(false)
        }else {
            //setInputPrompt('Listening...');
            recognition.start();
            console.log('recognition started');
            setIsRecording(true);
        }
    };

    return (
        <div className="voice-recorder-container">
            <button
                className={`voice-recorder-button ${isRecording ? 'recording' : ''}`}
                onClick={handleButtonClick}
            >
                <FaMicrophone className="microphone-icon" />
            </button>
            {isRecording && <div className="recording-indicator"></div>}
        </div>
    );
};

export default VoiceRecorderButton;