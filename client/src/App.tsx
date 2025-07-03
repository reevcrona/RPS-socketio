import "./App.css";
import { useState, useEffect } from "react";
import { socket } from "./socket";
function App() {
  const [isConnected, setIsConected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConected(true);
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  return (
    <>
      <h1>Am i connected? - {isConnected ? "Yes" : "No"}</h1>
    </>
  );
}

export default App;
