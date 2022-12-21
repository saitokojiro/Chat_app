import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './Page/Main/Chat/Chat';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*path temporary */}
          <Route path='/' element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
