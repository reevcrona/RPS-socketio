import { FaCircle } from "react-icons/fa";
import MessageList from "../components/MessageList";
import LobbyContainer from "../components/Lobby/LobbyContainer";
import LightBox from "../components/Lightbox";
import LobbyOptions from "../components/Lobby/LobbyOptions";
import LobbyList from "../components/Lobby/LobbyList";
import UserNameComponent from "../components/UserNameComponent";
import { useState } from "react";
import { useSocketEmitters } from "../hooks/useSocketEmitters";

type HomeProps = {
  isConnected: boolean;
};

function Home({ isConnected }: HomeProps) {
  const { sendMessageToServer } = useSocketEmitters();
  const [userName, setUserName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [showUsernameLightbox, setShowUsernameLightbox] =
    useState<boolean>(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setterFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setterFunc(e.target.value);
  };

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
        onChange={(e) => handleChange(e, setInputValue)}
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

      {userName && <h2>User: {userName}</h2>}

      <LobbyContainer setShowLightbox={setShowLightbox}>
        <LobbyList />
      </LobbyContainer>

      {showUsernameLightbox && (
        <LightBox>
          <UserNameComponent
            handleChange={handleChange}
            setShowUsernameLightbox={setShowUsernameLightbox}
            setUserName={setUserName}
            userName={userName}
          />
        </LightBox>
      )}

      {showLightbox && (
        <LightBox>
          <LobbyOptions setShowLightbox={setShowLightbox} />
        </LightBox>
      )}
    </div>
  );
}

export default Home;
