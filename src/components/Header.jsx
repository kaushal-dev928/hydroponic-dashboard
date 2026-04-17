import { useState } from "react";

export default function Header({ paused, onPauseToggle, mqttStatus }) {
  const [mode, setMode] = useState("manual");

  return (
    <div className="topbar">
      <div className="logo">HYDROPONIC IoT</div>

      <div className="top-controls">
        {["manual", "auto", "hybrid"].map((m) => (
          <button
            key={m}
            className={`mode ${mode === m ? "active" : ""}`}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}

        <span className="device">ESP001</span>

        <span className={`live ${paused ? "paused" : ""}`}>
          ● {paused ? "paused" : mqttStatus === "connected" ? "live" : "mock"}
        </span>

        <button className="pause" onClick={onPauseToggle}>
          {paused ? "resume" : "pause"}
        </button>
      </div>
    </div>
  );
}