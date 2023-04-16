import { useState } from "react";
import { SketchPicker } from "react-color";
import './App.css';
export default function Settings(props){
    //color picker
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });
  // destructuring rgba from state
  const { r, g, b, a } = sketchPickerColor;

  function setUser() {
    localStorage.setItem('color', JSON.stringify(props.color));
    localStorage.setItem('usersColor', JSON.stringify(props.usersColor))
  }

    return (
        <div className="settings">
            <h2>{props.color}</h2>
            <div className="sketchpicker">
                {/* Sketch Picker from react-color and handling color on onChange event */}
                <SketchPicker
                    onChange={(color) => {
                        props.handleColorChange(color.hex)
                        setSketchPickerColor(color.rgb)
                    }}
                    color={sketchPickerColor}
                />
            </div>
            <form onSubmit={setUser}>
                <input
                    type="text"
                    id="usersColor"
                    name="usersColor"
                    value={props.usersColor}
                    placeholder="Give your color a name"
                    onChange={(event) => {
                        props.handleUsernameChange(event.target.value);
                    }}
                />
                <button className="play" type="submit">Save</button>
            </form>

        </div>
    )
}