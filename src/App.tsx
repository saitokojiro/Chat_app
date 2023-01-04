import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chat from "./Page/Main/Chat/Chat";

import { wsContext, wsSocket } from "./context/websocket";

function App() {
  return (
    <wsContext.Provider value={wsSocket}>
      <div className="App">
        <Router>
          <Routes>
            {/*path temporary */}
            <Route path="/" element={<Chat />} />
            <Route path="/:id/" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </wsContext.Provider>
  );
}

export default App;
