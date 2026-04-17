import { useState } from "react";

const Toggle = ({ value, onClick }) => (
  <div className={`toggle ${value ? "on" : ""}`} onClick={onClick}>
    <div className="circle" />
  </div>
);

export default function ActuatorCard({ onCommand }) {
  const [pump, setPump]   = useState(true);
  const [light, setLight] = useState(false);
  const [air, setAir]     = useState(true);

  const activeCount = [pump, light, air].filter(Boolean).length;

  const toggle = (name, value, setter) => {
    const next = !value;
    setter(next);
    onCommand(name, next ? 1 : 0);
  };

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <p className="label" style={{ marginBottom: 0 }}>ACTUATOR CONTROL</p>
        <div>
          <span className="actuator-count">{activeCount}</span>
          <span style={{ fontSize: 11, color: "#6b9e78", marginLeft: 4 }}>active</span>
        </div>
      </div>

      <div className="row">
        <span>DC Pump</span>
        <Toggle value={pump} onClick={() => toggle("pump", pump, setPump)} />
      </div>

      <div className="row">
        <span>Grow Lights</span>
        <Toggle value={light} onClick={() => toggle("light", light, setLight)} />
      </div>

      <div className="row">
        <span>Air Pump</span>
        <Toggle value={air} onClick={() => toggle("air", air, setAir)} />
      </div>
    </div>
  );
}