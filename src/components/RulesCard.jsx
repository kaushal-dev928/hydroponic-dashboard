import { tdsStatus, tempStatus, humStatus, wlStatus } from "../utils/status";

function RuleRow({ tag, cls, action }) {
  return (
    <div className="rule">
      <span className={`rule-tag rule-${cls}`}>{tag}</span>
      <span style={{ color: "#6b9e78", fontSize: 11 }}>→</span>
      <span style={{ fontSize: 12, color: "#c4dcc9" }}>{action}</span>
    </div>
  );
}

export default function RulesCard({ data }) {
  if (!data) return null;

  const [wlC]  = wlStatus(data.water_level);
  const [tmpC] = tempStatus(data.temperature);
  const [tdsC] = tdsStatus(data.tds);
  const [humC] = humStatus(data.humidity);

  const wlAction  = wlC  === "ok"   ? "pump running"   : wlC  === "warn" ? "⚠ low — check" : "✕ pump_off!";
  const tmpAction = tmpC === "ok"   ? "pwm normal"     : tmpC === "warn" ? "⚠ pwm: 80%"    : "✕ alert + pwm max";
  const tdsAction = tdsC === "ok"   ? "no alert"       : tdsC === "warn" ? "⚠ low alert"   : "✕ critical alert";
  const humAction = humC === "ok"   ? "no alert"       : "⚠ low alert";

  return (
    <div className="card">
      <p className="label">RULE ENGINE</p>

      <RuleRow tag={`wl = ${data.water_level}%`}      cls={wlC}  action={wlAction}  />
      <RuleRow tag={`temp = ${data.temperature}°C`}   cls={tmpC} action={tmpAction} />
      <RuleRow tag={`tds = ${data.tds} ppm`}          cls={tdsC} action={tdsAction} />
      <RuleRow tag={`hum = ${data.humidity}%`}        cls={humC} action={humAction} />

      <div className="rule-divider">
        flow=0 &amp; pump=ON → fault check<br />
        pH out of range → dose alert
      </div>
    </div>
  );
}