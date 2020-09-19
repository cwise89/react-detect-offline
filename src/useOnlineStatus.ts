import { useEffect, useState } from "react";
import { Polling } from "./types";

const inBrowser = typeof navigator !== "undefined";

// these browsers don't fully support navigator.onLine, so we need to use a polling backup
const unsupportedUserAgentsPattern = /Windows.*Chrome|Windows.*Firefox|Linux.*Chrome/;

export const needPolling =
  inBrowser && unsupportedUserAgentsPattern.test(navigator.userAgent);

const defaultPollingConfig = {
  enabled: needPolling,
  url: "https://ipv4.icanhazip.com/",
  timeout: 5000,
  interval: 5000,
};

type PollingConfig = Partial<typeof defaultPollingConfig> & {
  enabled: boolean;
};

const ping = ({ url, timeout }) => {
  return new Promise((resolve) => {
    const isOnline = () => resolve(true);
    const isOffline = () => resolve(false);

    const xhr = new XMLHttpRequest();

    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status) {
          isOnline();
        } else {
          isOffline();
        }
      }
    };

    xhr.open("HEAD", url);
    xhr.timeout = timeout;
    xhr.send();
  });
};

function getPollingConfig(polling: Polling): PollingConfig {
  switch (polling) {
    case true:
      return defaultPollingConfig;
    case false:
      return { enabled: false };
    default:
      return Object.assign({}, defaultPollingConfig, polling);
  }
}

function noop() {}

export function useOnlineStatus(
  polling: Polling = needPolling,
  onChange: (online: boolean) => void = noop
) {
  const pollingConfig = getPollingConfig(polling);

  const [online, setOnline] = useState(
    inBrowser && typeof navigator.onLine === "boolean" ? navigator.onLine : true
  );

  const goOnline = () => {
    if (!online) {
      setOnline(true);
      onChange(true);
    }
  };
  const goOffline = () => {
    if (online) {
      setOnline(false);
      onChange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [goOnline, goOffline]);

  useEffect(() => {
    let pollingId;
    if (pollingConfig.enabled) {
      pollingId = setInterval(() => {
        const { url, timeout } = pollingConfig;
        ping({ url, timeout }).then(setOnline);
      }, pollingConfig.interval);
    }
    return () => {
      if (pollingId) {
        clearInterval(pollingId);
      }
    };
  }, [pollingConfig]);

  return online;
}
