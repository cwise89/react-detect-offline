[![npm](https://img.shields.io/npm/v/react-detect-offline.svg)](https://www.npmjs.com/package/react-detect-offline)
[![npm downloads](https://img.shields.io/npm/dm/react-detect-offline.svg)](https://www.npmjs.com/package/react-detect-offline)
![gzip size](http://img.badgesize.io/https://unpkg.com/react-detect-offline?compression=gzip&label=gzip%20size)
![badges](https://img.shields.io/badge/license-MIT-lightgrey.svg)

### Offline and Online components for React

Components that track [offline and online state](https://developer.mozilla.org/en-US/docs/Online_and_offline_events). Render certain content only when online (or only when offline).

```jsx
import { Offline, Online } from "react-detect-offline";

const App = () => (
  <div>
    <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline>
  </div>
);
```

### Demo

Check out [chris.bolin.co/offline](https://chris.bolin.co/offline) for a simple example ([source code](https://github.com/chrisbolin/offline/blob/master/src/App.js)).

### Components

#### Simple

`<Online/>` and `<Offline/>` - Components that render their children only when the browser is online/offline.

```jsx
<Offline>You're offline right now. Check your connection.</Offline>
```

#### Advanced

`<Detector render={({ online }) => ...}/>` - Component that calls its `render` prop every time the connection state changes. The `render` prop is supplied with an object with an `online` boolean value. _Recommended for more complex cases, e.g. when styles need to be changed with connection status._

```jsx
<Detector
  render={({ online }) => (
    <div className={online ? "normal" : "warning"}>
      You are currently {online ? "online" : "offline"}
    </div>
  )}
/>
```

### Props

`<Online/>`, `<Offline/>`, and `<Detector/>` accept the following props:

| Prop               | Type        | Description                       | Default                        |
| ------------------ | ----------- | --------------------------------- | ------------------------------ |
| `polling`          | Obj or Bool | Config for polling fallback [1]   | [see below]                    |
| `polling.enabled`  | Boolean     | Force polling on or off           | Depends on the browser [1]     |
| `polling.url`      | String      | URL to pool for connection status | `"https://ipv4.icanhazip.com"` |
| `polling.interval` | Number      | How often (in ms) to poll         | `5000`                         |
| `polling.timeout`  | Number      | How long (in ms) before timeout   | `5000`                         |
| `onChange`         | Function    | Called when connection changes    | none                           |
| `children` [2]     | Element(s)  | Children **not Detector**         | none                           |
| `render` [3]       | Func        | Render function **Detector only** | none                           |

[1] Polling is only used as a fallback for browsers that don't support the `"online"` event. Currently these are Chrome on Windows, Firefox on Windows, and Chrome on Linux.

[2] `<Online/>` and `<Offline/>` only. `<Detector/>` will not render `children`.

[3] `<Detector/>` only

### Browser Support

The [web spec](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) we rely on is supported by IE 9+, Chrome 14+, Firefox 41+, and Safari 5+ - that's [94% of worldwide (98% of US)](http://caniuse.com/#feat=online-status) browser traffic. A polling fallback is used for browsers that don't implement the spec in a useful way (see note [1] in the above Props section).

### Contributing

This package is maintained by [cwise89](https://github.com/cwise89) (and was initially created by [chrisbolin](https://github.com/chrisbolin)).

PRs are welcome!

* Test: `yarn test`
* Build: `yarn build`. Make sure you commit the build file (`dist/index.js`)
