import React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 10000,
    maxRetries: 10,
};
  
let userID:any = localStorage.getItem("c_userId")
let name:any = localStorage.getItem("c_name") 

//lt --local-host 127.0.0.1 --subdomain saitokojiro --port 3987
//export const wsSocket = new ReconnectingWebSocket("ws://saitokojiro.loca.lt/?token="+userID+"&user="+name,[],options);
export const wsSocket = new ReconnectingWebSocket("ws://127.0.0.1:3987/connection?user="+name,[],options);
export const wsContext = React.createContext(wsSocket);