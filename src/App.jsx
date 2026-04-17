import { useState, useEffect } from "react";

import { useMqtt }     from "./hooks/useMqtt";
import { useMockData } from "./hooks/useMockData";
import { tdsStatus, tempStatus, humStatus, wlStatus } from "./utils/status";

import Header      from "./components/Header";
import SensorCard  from "./components/SensorCard";
import WaterCard   from "./components/WaterCard";
import ActuatorCard from "./components/ActuatorCard";
import TrendChart  from "./components/TrendChart";
import MqttLog     from "./components/MqttLog";
import AlertsCard  from "./components/AlertsCard";
import RulesCard   from "./components/RulesCard";

import "./App.css";

export default function App() {
  const [paused, setPaused] = useState(false);

  // ── MQTT (real ESP32 data)
  const { data: mqttData, status, logs, sendCommand } = useMqtt({
    broker:    "broker.hivemq.com",
    port:      8884,
    topicBase: "hydroponic/ESP001",
    paused,
  });

  // ── Mock data fallback (used when MQTT has no data)
  const mockData = useMockData(paused);

  // ── Merge: prefer MQTT data if received, else mock
  const data = mqttData ?? mockData;

  // ── History for chart (last 20 readings)
  const [history, setHistory] = useState({ labels: [], temp: [], hum: [], tds: [] });

  useEffect(() => {
    if (!data || paused) return;
    const t = new Date().toLocaleTimeString("en-IN", { hour12: false });
    setHistory((h) => ({
      labels: [...h.labels, t].slice(-20),
      temp:   [...h.temp, data.temperature].slice(-20),
      hum:    [...h.hum,  data.humidity].slice(-20),
      tds:    [...h.tds,  data.tds].slice(-20),
    }));
  }, [data, paused]);

  // ── Status badge helpers per sensor
  const [tdsC, tdsL]   = tdsStatus(data.tds);
  const [tmpC, tmpL]   = tempStatus(data.temperature);
  const [humC, humL]   = humStatus(data.humidity);
  const [wlC,  wlL]    = wlStatus(data.water_level);

  return (
    <>
      <Header
        paused={paused}
        onPauseToggle={() => setPaused((p) => !p)}
        mqttStatus={status}
      />

      <div className="container">

        {/* ── SENSOR GRID */}
        <div className="grid">
          <SensorCard label="TDS"         value={data.tds}          unit="ppm" statusClass={tdsC} statusText={tdsL} />
          <SensorCard label="Temperature" value={data.temperature}  unit="°C"  statusClass={tmpC} statusText={tmpL} />
          <SensorCard label="Humidity"    value={data.humidity}     unit="%"   statusClass={humC} statusText={humL} />
          <SensorCard label="Water Level" value={data.water_level}  unit="%"   statusClass={wlC}  statusText={wlL}  />
        </div>

        {/* ── WATER / ACTUATOR / ALERTS */}
        <div className="section grid3">
          <WaterCard    wl={data.water_level} />
          <ActuatorCard onCommand={sendCommand} />
          <AlertsCard   data={data} />
        </div>

        {/* ── CHART + RULE ENGINE */}
        <div className="section grid2">
          <TrendChart history={history} />
          <RulesCard  data={data} />
        </div>

        {/* ── MQTT LOGS */}
        <MqttLog logs={logs} />

      </div>
    </>
  );
}