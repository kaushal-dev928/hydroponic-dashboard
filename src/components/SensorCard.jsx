// SensorCard — shows label, value, unit, and a status badge
export default function SensorCard({ label, value, unit, statusClass, statusText }) {
  return (
    <div className="card">
      <div className="label">{label}</div>
      <div className="value">
        {value ?? "—"} <span>{unit}</span>
      </div>
      {statusText && (
        <div className={`status-badge badge-${statusClass}`}>{statusText}</div>
      )}
    </div>
  );
}