import { tdsStatus, tempStatus, humStatus, wlStatus } from "../utils/status";

export default function AlertsCard({ data }) {
  if (!data) return null;

  const alerts = [];

  const [tdsC, tdsL] = tdsStatus(data.tds);
  if (tdsC !== "ok") alerts.push({ cls: tdsC, msg: `TDS ${tdsL}: ${data.tds} ppm` });

  const [tmpC, tmpL] = tempStatus(data.temperature);
  if (tmpC !== "ok") alerts.push({ cls: tmpC, msg: `Temperature ${tmpL}: ${data.temperature}°C` });

  const [humC, humL] = humStatus(data.humidity);
  if (humC !== "ok") alerts.push({ cls: humC, msg: `Humidity ${humL}: ${data.humidity}%` });

  const [wlC, wlL] = wlStatus(data.water_level);
  if (wlC !== "ok") alerts.push({ cls: wlC, msg: `Water ${wlL}: ${data.water_level}%` });

  return (
    <div className="card">
      <p className="label">ALERTS</p>

      {alerts.length === 0 ? (
        <div className="alert-item alert-ok">✓ All systems normal</div>
      ) : (
        alerts.map((a, i) => (
          <div key={i} className={`alert-item alert-${a.cls}`}>
            {a.cls === "crit" ? "✕" : "⚠"} {a.msg}
          </div>
        ))
      )}
    </div>
  );
}