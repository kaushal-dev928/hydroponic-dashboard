import { useState, useEffect, useRef } from "react";

const INITIAL = {
  temperature: 26.5,
  humidity: 62,
  tds: 430,
  water_level: 70,
};

// Drift a value randomly within min/max, step = max change per tick
function drift(v, step, min, max, decimals = 0) {
  const next = v + (Math.random() - 0.5) * step;
  const clamped = Math.max(min, Math.min(max, next));
  return +clamped.toFixed(decimals);
}

export function useMockData(paused = false) {
  const [data, setData] = useState(INITIAL);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setData((prev) => ({
        temperature: drift(prev.temperature, 0.6, 18, 38, 1),
        humidity: drift(prev.humidity, 1.2, 20, 95, 1),
        tds: drift(prev.tds, 8, 100, 900, 0),
        water_level: drift(prev.water_level, 1, 5, 100, 0),
      }));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return data;
}
