import React, { useState, useEffect } from 'react';
import { usersColorRange } from "./hexCodeAlgorithm";
import usersData from "./users.json";
import matchFound from "./images/MatchFound.png";
import matchNotFound from "./images/MatchNotFound.png";

function SpeechToText(props) {
  const msg = new SpeechSynthesisUtterance()
  const errorMessages = ["Match found", "User is not in your range", "No match found, try again"]
  const [transcript, setTranscript] = useState();
  const [recognition, setRecognition] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [match, setMatch] = useState();
  const [status, setStatus] = useState(false); //not listening (listen)


  useEffect(() => {
    console.log("transkript: " + transcript)
    checkForMatch()
  }, [transcript])
  function checkForMatch() {
    const result = usersData.find(potentialMatch => potentialMatch.username === transcript);
    console.log(JSON.stringify(usersData))
    if (result !== undefined) {
      const potentialsMatchColorRange = usersColorRange(result.hex);
      // console.log(potentialsMatchColorRange)
      const thisUsersColorRange = usersColorRange(props.color);
      // console.log(thisUsersColorRange)
      if (thisUsersColorRange === potentialsMatchColorRange) {
        setMatch({ username: result.username, hex: result.hex })
        setErrorMessage(errorMessages[0])
        setStatus(false)
      } else {
        setErrorMessage(errorMessages[1])
        setMatch()
        setStatus(false)
      }
    } else {
      setErrorMessage(errorMessages[2])
      setMatch()
      setStatus(false)
    }

  }

  // Initialize the recognition service when the component mounts
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        console.log("jsem v setting transcriptu")
        setStatus(false);
      };
      recognition.onend = function () {
        setStatus(false);
      };
      setRecognition(recognition);
    } else {
      console.log('Speech recognition is not supported in this browser.');
    }
  }, []);

  // Start the recognition service when the user clicks a button
  function startRecognition() {
    if (recognition) {
      recognition.start();
      setStatus(true)
    }
  }
  function stopRecognition(){
    if (recognition) {
      recognition.stop();
      setStatus(false)
    }
  }
  function playAudio() {
    msg.text = props.usersColor
    window.speechSynthesis.speak(msg)
  }

  function tryAgain() {
    setMatch()
    setErrorMessage()
    setTranscript()
  }

  return (
    <div className="bottom-bar">
      {/* <p>{transcript}</p> */}
        {transcript && <img src={match ? matchFound : matchNotFound} />}
        {transcript && <h3>{errorMessage}</h3>}
        {match && <div className='matchCard'>
          <h1>User: {match.username}</h1>
          <div className='match' style={{ backgroundColor: match.hex }}></div>
          <button className="play" onClick={tryAgain}>Continue</button>
        </div>}
      {!match && <div className="bottom-bar-buttons">
        {!status && <button className="play" onClick={playAudio}>Play</button>}
        <button className="listen" onClick={status ? stopRecognition : startRecognition}>{status ? "Listening" : "Listen"}</button>
      </div>
      }
    </div>
  );
}

export default SpeechToText;
