import { wlStatus } from "../utils/status";

export default function WaterCard({ wl }) {
  const [cls, label] = wlStatus(wl ?? 0);

  const barColor =
    cls === "crit" ? "#f87171" : cls === "warn" ? "#facc15" : "#34d363";

  const statusMsg =
    cls === "crit"
      ? "✕ critical — refill now!"
      : cls === "warn"
      ? "⚠ low — check tank"
      : "● normal operation";

  const statusColor =
    cls === "crit" ? "#f87171" : cls === "warn" ? "#facc15" : "#34d363";

  return (
    <div className="card">
      <p className="label">WATER LEVEL · TANK</p>

      <div className="value">
        {wl ?? "—"} <span>%</span>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${wl ?? 0}%`, backgroundColor: barColor }}
        />
      </div>

      <p className="status-text" style={{ color: statusColor }}>
        {statusMsg}
      </p>
    </div>
  );
}