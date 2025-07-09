import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import { useState } from "react";
import { socket } from "./socket/socket";
import { useSocketListeners } from "./hooks/useSocketListeners";
import type { User } from "./types/userType";
function App() {
  const [isConnected, setIsConected] = useState(socket.connected);
  const [users, setUsers] = useState<User[]>([]);
  useSocketListeners(setIsConected, setUsers);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isConnected={isConnected} />} />
        <Route path="/lobby/:id" element={<Lobby users={users} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
