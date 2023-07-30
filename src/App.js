import "./App.css";
import Todo from "./ToDo/Todo";
import { Colors } from "./Data/ColorData";
import { useState } from "react";

function App() {
  const [color, setcolor] = useState("white");
  return (
    <div className="App" style={{ background: color }}>
      <div className="Color">
        <div
          className="mainColor"
        
        >
          {Colors.map((colors) => {
            return (
              <div>
                <button
                className="colorBtn"
                  onClick={() => setcolor(colors.color)}
                  style={{
                    background: colors.color,
                  }}
                ></button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Todo">
        <Todo color={color} />
      </div>
    </div>
  );
}

export default App;
