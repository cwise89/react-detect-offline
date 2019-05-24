interface PingOptions {
  url: string;
  timeout: number;
  method: string;
}

export function ping({ url, timeout, method }: PingOptions) {
  return new Promise((resolve: (x: boolean) => any) => {
    const isOnline = () => resolve(true);
    const isOffline = () => resolve(false);

    const xhr = new XMLHttpRequest();

    xhr.onerror = isOffline;
    xhr.ontimeout = isOffline;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.HEADERS_RECEIVED) {
        if (xhr.status >= 200) {
          isOnline();
        } else {
          isOffline();
        }
      }
    };

    xhr.open(method, url);
    xhr.timeout = timeout;
    xhr.send();
  });
}

interface RegisterOptions {
  browserEventsEnabled?: boolean;
  pollingInterval?: number;
  pollingTimeout?: number;
  pollingEnabled?: boolean;
  pollingURL?: string;
  pollingMethod?: string;
}

export default function register(
  {
    browserEventsEnabled = true,
    pollingInterval = 1000,
    pollingTimeout = 1000,
    pollingEnabled = false,
    pollingURL = "https://www.google.com",
    pollingMethod = "HEAD"
  }: RegisterOptions,
  callback: (online: boolean) => void
) {
  let state = true;

  const changeOnlineState = (newState: boolean) => {
    if (newState !== state) {
      state = newState;
      callback(state);
    }
  };

  const isOnline = () => changeOnlineState(true);
  const isOffline = () => changeOnlineState(false);

  if (browserEventsEnabled) {
    window.addEventListener("online", isOnline);
    window.addEventListener("offline", isOffline);
  }

  let intervalId = 0;
  if (pollingEnabled) {
    intervalId = window.setInterval(
      () =>
        ping({
          timeout: pollingTimeout,
          url: pollingURL,
          method: pollingMethod
        }).then(pingOnline => changeOnlineState(pingOnline)),
      pollingInterval
    );
  }

  return function unregister() {
    if (browserEventsEnabled) {
      window.removeEventListener("online", isOnline);
      window.removeEventListener("offline", isOffline);
    }

    if (pollingEnabled) {
      window.clearInterval(intervalId);
    }
  };
}
