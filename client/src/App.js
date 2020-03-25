import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'antd/dist/antd.css';
import './App.css';

import ChatRoom from './components/ChatRoom/ChatRoom';
import Join from './components/Join/Join';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={ChatRoom} />
    </Router>
  );
}

 export default App;