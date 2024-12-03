import React, { useState } from "react";
import HoodieViewer from "./components/HoodieViewer";
import "./index.css";

const App: React.FC = () => {
  const [color, setColor] = useState<string>("#ffffff");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="app">
      {/* Dynamiczny kolor dla h1 */}
      <h1 style={{ color: color }}>hexClothing</h1>
      <div className="viewer">
        <HoodieViewer color={color} />
      </div>
      <div  className="controls">
        <input
          style={{ color: color }}
          type="text"
          value={color}
          onChange={handleChange}
          placeholder="Wpisz kolor HEX (np. #ff5733)"
        />
      </div>
    </div>
  );
};

export default App;