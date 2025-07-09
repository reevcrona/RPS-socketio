import { useState } from "react";
import { CiGlobe, CiLock } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSocketEmitters } from "../../hooks/useSocketEmitters";

type LobbyOptionsProps = {
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>;
};

function LobbyOptions({ setShowLightbox }: LobbyOptionsProps) {
  const { createLobby } = useSocketEmitters();

  const [lobbyData, setLobbyData] = useState({
    name: "",
    isPrivate: false,
    password: "",
  });

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setLobbyData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(lobbyData);
  };

  const handleCreateLobby = async () => {
    try {
      await createLobby(lobbyData);
      setShowLightbox(false);
    } catch (error) {
      console.error("Lobby creation failed:", error);
    }
  };

  const handleLightboxExit = (): void => {
    setLobbyData({
      name: "",
      isPrivate: false,
      password: "",
    });
    setShowLightbox(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Lobby</h2>
          <IoIosCloseCircleOutline
            onClick={handleLightboxExit}
            className="text-3xl transition cursor-pointer duration-200 ease-in-out hover:scale-125"
          />
        </div>
      </div>

      <form className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lobby Name
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            type="text"
            value={lobbyData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter lobby name..."
          />
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

        {lobbyData.isPrivate && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={lobbyData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}
      </form>

      <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex gap-3">
        <button
          type="button"
          onClick={handleLightboxExit}
          className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreateLobby}
          disabled={!lobbyData.name.trim()}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
        >
          Create Lobby
        </button>
      </div>
    </div>
  );
}

export default LobbyOptions;
