function LobbyTile() {
  return (
    <div className="bg-white text-black w-full justify-between max-w-[300px] min-h-[120px] flex flex-col p-4">
      <h2 className="font-bold text-xl">Room 001</h2>
      <div className="flex justify-between">
        <h3>Players 1/2</h3>
        <div className="bg-green-500 px-3 py-1">
          <h3>Active</h3>
        </div>
      </div>
      <p>Connected: Player123</p>
      <div className="flex items-center justify-center ">
        <button className="bg-green-500 cursor-pointer mt-3 w-full max-w-[150px] rounded-lg p-1 text-lg">
          Join Lobby
        </button>
      </div>
    </div>
  );
}

export default LobbyTile;
