import React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 10000,
    maxRetries: 10,
};
  

//export const wsSocket = new WebSocket("ws://127.0.0.1:3987/?token="+localStorage.getItem("c_user"));
export const wsSocket = new ReconnectingWebSocket("ws://127.0.0.1:3987/?token="+localStorage.getItem("c_user"),[],options);
export const wsContext = React.createContext(wsSocket);