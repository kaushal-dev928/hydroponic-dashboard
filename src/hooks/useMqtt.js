import { useState, useEffect, useRef, useCallback } from "react";
import mqtt from "mqtt";

export function useMqtt({
  broker = "broker.hivemq.com",
  port = 8884,
  topicBase = "hydroponic/ESP001",
  paused = false,
}) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [logs, setLogs] = useState([]);
  const clientRef = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const addLog = useCallback((dir, msg) => {
    const t = new Date().toLocaleTimeString("en-IN", { hour12: false });
    setLogs((l) => [{ dir, msg, t }, ...l].slice(0, 50));
  }, []);

  const sendCommand = useCallback(
    (action, value) => {
      const topic = `${topicBase}/command`;
      const payload = JSON.stringify({
        device_id: "ESP001",
        command: action,
        value,
      });
      addLog("out", `${topic} → ${JSON.stringify({ action, value })}`);
      if (clientRef.current?.connected) {
        clientRef.current.publish(topic, payload);
      }
    },
    [topicBase, addLog],
  );

  useEffect(() => {
    // Use props for broker and port
    const url = `wss://${broker}:${port}/mqtt`;

    setStatus("connecting");
    addLog("sys", `connecting → ${url}`);

    const client = mqtt.connect(url, {
      clientId: "react_" + Math.random().toString(16).slice(2),
      clean: true,
      connectTimeout: 6000,
      reconnectPeriod: 3000,
    });

    clientRef.current = client;

    client.on("connect", () => {
      setStatus("connected");
      addLog("sys", "connected ✓");

      const topics = [
        `${topicBase}/data`,
        `${topicBase}/status`,
        `${topicBase}/alert`,
      ];
      topics.forEach((t) =>
        client.subscribe(t, (err) => {
          if (!err) addLog("sys", `subscribed: ${t}`);
        }),
      );
    });

    client.on("message", (topic, message) => {
      if (pausedRef.current) return;
      const raw = message.toString();
      addLog("in", `${topic} • ${raw}`);
      try {
        const parsed = JSON.parse(raw);
        setData((prev) => ({ ...prev, ...(parsed.data || parsed) }));
      } catch (e) {
        addLog("sys", `parse error: ${e.message}`);
      }
    });

    client.on("error", (err) => {
      setStatus("error");
      addLog("sys", `error: ${err.message}`);
    });

    client.on("close", () => {
      setStatus("disconnected");
      addLog("sys", "connection closed");
    });

    client.on("reconnect", () => {
      setStatus("connecting");
      addLog("sys", "reconnecting...");
    });

    return () => {
      client.end(true);
      clientRef.current = null;
    };
  }, [broker, port, topicBase, addLog]);

  return { data, status, logs, sendCommand };
}
