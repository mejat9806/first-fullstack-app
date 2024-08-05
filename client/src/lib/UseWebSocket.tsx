import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const PORT = import.meta.env.VITE_PORT || 8000;
console.log(PORT, "port");
const URLSOCKET = import.meta.env.VITE_DEVELOPMENT_SOCKETIO;
const socket = io(URLSOCKET); // Use your server URL

const UseWebSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // socket.disconnect(); // this is for disconnecting the socket
  return { socket, connected };
};

export default UseWebSocket;
