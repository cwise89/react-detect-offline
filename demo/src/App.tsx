import React, { useState, useEffect } from "react";

import useOnline from "react-detect-offline/dist/useOnline";

export default function App() {
  const online = useOnline();
  return (
    <div className="App">
      <h1>online? {online ? "yes" : "NO"}</h1>
    </div>
  );
}
