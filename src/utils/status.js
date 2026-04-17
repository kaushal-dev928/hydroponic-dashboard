// TDS: <300 = critical, 300-400 = warn, >=400 = ok
export const tdsStatus = (v) => {
  if (v < 300) return ["crit", "CRITICAL LOW"];
  if (v < 400) return ["warn", "LOW"];
  return ["ok", "OK"];
};

// Temperature: >32 = critical, >30 = warn, else ok
export const tempStatus = (v) => {
  if (v > 32) return ["crit", "CRITICAL HIGH"];
  if (v > 30) return ["warn", "HIGH"];
  return ["ok", "NORMAL"];
};

// Humidity: <30 = critical, <40 = warn, else ok
export const humStatus = (v) => {
  if (v < 30) return ["crit", "CRITICAL LOW"];
  if (v < 40) return ["warn", "LOW"];
  return ["ok", "OK"];
};

// Water level: <20 = critical, <35 = warn, else ok
export const wlStatus = (v) => {
  if (v < 20) return ["crit", "CRITICAL"];
  if (v < 35) return ["warn", "LOW"];
  return ["ok", "NORMAL"];
};
