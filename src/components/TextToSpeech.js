
import React, { useState } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import '../TextToSpeech.css';

function TextToSpeech() {
    const [value, setValue] = useState('');

    const {speak} = useSpeechSynthesis();
    
  return (
   <div className="speech">
       <div className="group">
            <h2>
                Enter the text to speak
            </h2>
       </div>
       <div className="group">
       <textarea
        value={value}       
        onChange={(event) => setValue(event.target.value)}
      />
       </div>
       <div className="group">
        <button onClick={() => speak({text:value})}>
            Speech
        </button>
       </div>
   </div>
  );
}

export default TextToSpeech;
