[![npm](https://img.shields.io/npm/v/react-detect-offline.svg)](https://www.npmjs.com/package/react-detect-offline)
![gzip size](http://img.badgesize.io/https://unpkg.com/react-detect-offline?compression=gzip&label=gzip%20size)
![badges](https://img.shields.io/badge/license-MIT-lightgrey.svg)
![badges](https://img.shields.io/badge/badges-4-lightgrey.svg)

### Offline and Online components for React

Components that track [offline and online state](https://developer.mozilla.org/en-US/docs/Online_and_offline_events). Render certain content only when online (or only when offline).

```jsx
import { Offline, Online } from 'react-detect-offline';

const App = () => (
  <div>
    <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline>
  </div>
);
```

### Demo

Check out [chris.bolin.co/offline](https://chris.bolin.co/offline) for a simple example ([source code](https://github.com/chrisbolin/offline/blob/master/src/App.js)). As in this example, `react-detect-offline` pairs well with [`create-react-app`](https://github.com/facebookincubator/create-react-app), which creates offline-ready React apps out of the box.

### API

`<Online>` - Component that renders its children only when  the browser is online.

`<Offline>` - Component that renders its children only when the browser is not online.

**Note:** `Online` and `Offline` are mutually exclusive; if one is rendering, the other will not be.

### Browser Support

The [web spec](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) we rely on is supported by IE 9+, Chrome 14+, Firefox 41+, and Safari 5+ - that's [94% of worldwide (98% of US)](http://caniuse.com/#feat=online-status) browser traffic.

### Example Uses

- Use `Offline` to remind users they might need to connect to complete certain actions.
- Use `Online` to let readers know the page is available offline.
- Use `Online` to hide links or other content that is irrelevant when offline.
- idk, use your dang imagination.
