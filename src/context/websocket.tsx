import React from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 10000,
    maxRetries: 10,
    debug:false
};
  
//let userID:any = localStorage.getItem("c_userId")
let name:any = localStorage.getItem("c_name") 

//lt --local-host 127.0.0.1 --subdomain saitokojiro --port 3987
//export const wsSocket = new ReconnectingWebSocket("ws://saitokojiro.loca.lt/?token="+userID+"&user="+name,[],options);
console.log(process.env.REACT_APP_WEBSOCKET_ADDRESS)
//export const wsSocket = new ReconnectingWebSocket(envVar+"ws://127.0.0.1:3987/connection?user="+name,[],options);
export const wsSocket = new ReconnectingWebSocket(process.env.REACT_APP_WEBSOCKET_ADDRESS+"/connection?user="+name,[],options);
export const wsContext = React.createContext(wsSocket);