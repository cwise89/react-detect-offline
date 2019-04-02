import { useState, useEffect } from "react";
import register from "./connectionListener";

export default function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(
    () =>
      register(
        {
          pollingEnabled: true,
          pollingMethod: "HEAD",
          pollingInterval: 5000,
          pollingURL: "http://api.icanhazip.com/",
          browserEventsEnabled: true
        },
        online => setOnline(online)
      ),
    []
  );

  return online;
}
