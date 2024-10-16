// src/App.js

import React from "react";
import TaskBoard from "./components/TaskBoard";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
