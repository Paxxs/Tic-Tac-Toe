import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);
