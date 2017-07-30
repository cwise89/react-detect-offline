Offline and Online components for React

```jsx
import React from 'react';
import { Offline, Online } from 'react-detect-offline';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Online>Did you know this page is available offline?</Online>
        <Offline>You are currently offline.</Offline>
      </div>
    );
  }
}
```
