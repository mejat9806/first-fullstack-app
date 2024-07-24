import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`); // Use your server URL

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
