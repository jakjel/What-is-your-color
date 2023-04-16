import './App.css';
import React, {useState} from 'react';
import menuIcon from "./images/menu-icon.png";
import Settings from "./Settings";
import SpeechToText from './SpeechToText';

const App = () => {
  const [color, setColor] = useState(JSON.parse(window.localStorage.getItem("color")) ?? "Set color") //using it here for background
  const [usersColor, setUsersColor] = useState(JSON.parse(window.localStorage.getItem("usersColor")) ?? "") //this is what will be read and recogniyed from database
  const [show, setShow] = useState(false) //state for settings

  function changeColor() {
    setShow(!show)
  }
  function handleColorChange(color) {
    setColor(color)
  }
  function handleUsernameChange(username) {
    setUsersColor(username)
  }

  return (
    <div className="dashboard" style={{ backgroundColor: color }}>
      <img src={menuIcon} alt="menu-icon" className="menu-icon" onClick={changeColor}/>
      {show && <Settings handleColorChange={handleColorChange} handleUsernameChange={handleUsernameChange} color={color} usersColor={usersColor} />}
      <SpeechToText usersColor={usersColor} color={color}/>
    </div>
  );
}

export default App;