export default function MqttLog({ logs }) {
  return (
    <div className="section logs">
      {logs.length === 0 && (
        <div className="log-sys">no logs yet...</div>
      )}
      {logs.map((l, i) => (
        <div key={i} className={`log-${l.dir}`}>
          {l.t} → {l.msg}
        </div>
      ))}
    </div>
  );
}