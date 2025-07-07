import { useState } from "react";
import "./App.css";
import { useSocket } from "./hooks/useSocket";
import { FaCircle } from "react-icons/fa";
import MessageList from "./components/MessageList";
import LobbyContainer from "./components/Lobby/LobbyContainer";
import LobbyTile from "./components/Lobby/LobbyTitle";
import LightBox from "./components/Lightbox";
import LobbyOptions from "./components/Lobby/LobbyOptions";
function App() {
  const { isConnected, message, sayHelloToServer, sendMessageToServer } =
    useSocket();

  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col  items-center w-full">
      <div onClick={sayHelloToServer} className="flex items-center mb-7">
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

      <h2 className="ml-3">
        Message from the backend - <span className="font-bold">{message}</span>
      </h2>

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

      <LobbyContainer>
        <LobbyTile />
        <LobbyTile />
        <LobbyTile />
      </LobbyContainer>

      <LightBox>
        <LobbyOptions />
      </LightBox>
    </div>
  );
}

export default App;
