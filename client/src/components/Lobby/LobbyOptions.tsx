import { useState } from "react";
import { CiGlobe, CiLock } from "react-icons/ci";

function LobbyOptions() {
  const [lobbyData, setLobbyData] = useState({
    name: "",
    maxPlayers: 4,
    isPrivate: false,
    password: "",
    gameMode: "casual",
    timeLimit: 30,
    allowSpectators: true,
    autoStart: false,
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setLobbyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white min-h-[200px] p-2 w-full max-w-[600px] flex flex-col justify-center items-center">
      <h2>Create New Lobby</h2>
      <form>
        <div className="flex flex-col">
          <label htmlFor="lobbyName">LobbyName</label>
          <input type="text" id="lobbyName" name="lobbyName" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Privacy Setting
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                checked={!lobbyData.isPrivate}
                onChange={() => handleInputChange("isPrivate", false)}
                className="mr-3 text-purple-600"
              />
              <CiGlobe className="mr-2" size={16} />
              <span>Public - Anyone can join</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                checked={lobbyData.isPrivate}
                onChange={() => handleInputChange("isPrivate", true)}
                className="mr-3 text-purple-600"
              />
              <CiLock className="mr-2" size={16} />
              <span>Private - Password required</span>
            </label>
          </div>
        </div>
        <div className="flex w-full justify-evenly">
          <button className="bg-gray-600 p-2">Cancel</button>
          <button className="bg-green-500 p-2">Create Lobby</button>
        </div>
      </form>
    </div>
  );
}

export default LobbyOptions;
