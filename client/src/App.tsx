import { useState } from "react";
import "./App.css";
import { socket } from "./socket/socket";
import { useSocketListeners } from "./hooks/useSocketListeners";
import { FaCircle } from "react-icons/fa";
import MessageList from "./components/MessageList";
import LobbyContainer from "./components/Lobby/LobbyContainer";
import LightBox from "./components/Lightbox";
import LobbyOptions from "./components/Lobby/LobbyOptions";
import LobbyList from "./components/Lobby/LobbyList";
import { useSocketEmitters } from "./hooks/useSocketEmitters";
function App() {
  const { sendMessageToServer } = useSocketEmitters();

  const [inputValue, setInputValue] = useState<string>("");
  const [isConnected, setIsConected] = useState(socket.connected);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useSocketListeners(setIsConected);
  return (
    <div className="flex flex-col  items-center w-full">
      <div className="flex items-center mb-7">
        <FaCircle
          className={`mr-6 text-5xl ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
        />
        <h1
          className={`${
            isConnected ? "text-green-500" : "text-red-500"
          } text-4xl`}
        >
          {isConnected ? "Connected" : "No connection"}
        </h1>
      </div>

      <input
        className="bg-black text-white"
        placeholder="text here"
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e)}
      />
      <button
        onClick={() => sendMessageToServer(inputValue)}
        className="text-white bg-black mt-3 p-2 rounded-xl"
      >
        Send message
      </button>

      <div>
        <MessageList />
      </div>

      <LobbyContainer setShowLightbox={setShowLightbox}>
        <LobbyList />
      </LobbyContainer>

      {showLightbox && (
        <LightBox>
          <LobbyOptions setShowLightbox={setShowLightbox} />
        </LightBox>
      )}
    </div>
  );
}

export default App;
