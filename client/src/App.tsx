import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { useState } from "react";
import { socket } from "./socket/socket";
import { useSocketListeners } from "./hooks/useSocketListeners";
function App() {
  const [isConnected, setIsConected] = useState(socket.connected);
  useSocketListeners(setIsConected);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isConnected={isConnected} />} />
        <Route path="/lobby/:id" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
