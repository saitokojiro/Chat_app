import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Chat from "./Page/Main/Chat/Chat";

import { wsContext, wsSocket } from "./context/websocket";
import Home from "./Page/Main/Home/Home";

const isExistStorage = () => {
  let c_userID: any = localStorage.getItem("id_User");
  let c_name: any = localStorage.getItem("c_name");
  
  if (c_userID !== null && c_name != null) return true;
  else return false;
};

console.log(isExistStorage());

const PrivateWrapper = (props: { children: any; auth: any; to: string }) => {
  const auth = props.auth;
  return auth ? props.children : <Navigate to={props.to} replace />;
};

function App() {
  return (
    <wsContext.Provider value={wsSocket}>
      <div className="App">
        <Router>
          <Routes>
            {/*path temporary */}
            {/*<Route path="/" element={<Chat />} />*/}
            <Route
              path="/"
              element={
                <PrivateWrapper auth={!isExistStorage()} to="/message">
                  <Home />
                </PrivateWrapper>
              }
            />
            <Route
              path="/message"
              element={
                <PrivateWrapper auth={isExistStorage()} to="/">
                  <Chat />
                </PrivateWrapper>
              }
            />
            <Route
              path="/message/:id/"
              element={
                <PrivateWrapper auth={isExistStorage()} to="/">
                  <Chat />
                </PrivateWrapper>
              }
            />
            <Route path="*" element={<>error</>} />
            {/*<Route path="/login" element={<Home/>} />*/}
          </Routes>
        </Router>
      </div>
    </wsContext.Provider>
  );
}

export default App;
