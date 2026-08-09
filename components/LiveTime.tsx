"use client";

import { useEffect, useState } from "react";

function formatParts(date: Date) {
  const datePart = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);

  const timePart = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);

  const ms = String(date.getMilliseconds()).padStart(3, "0");
  const match = timePart.match(/^(\d{1,2}:\d{2}:\d{2})(.*)$/);
  const clock = match ? `${match[1]}.${ms}` : timePart;
  const suffix = match ? match[2] : "";

  return { datePart, clock, suffix };
}

export function LiveTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 50);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="live-time" suppressHydrationWarning>
        —
      </span>
    );
  }

  const { datePart, clock, suffix } = formatParts(now);

  return (
    <span className="live-time" suppressHydrationWarning>
      {datePart},{" "}
      <span className="live-time__clock" style={{ width: `${clock.length}ch` }}>
        {clock}
      </span>
      {suffix}
    </span>
  );
}
