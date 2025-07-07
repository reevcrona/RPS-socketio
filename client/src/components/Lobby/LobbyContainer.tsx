import type { ReactNode } from "react";

type LobbyContainerProps = {
  children: ReactNode;
  setShowLightbox: React.Dispatch<React.SetStateAction<boolean>>;
};

function LobbyContainer({ children, setShowLightbox }: LobbyContainerProps) {
  return (
    <div className=" flex flex-col mb-4  items-center mt-8 w-full max-w-[850px] min-h-[400px] text-white bg-black">
      <h2 className="mt-4 text-3xl">Lobby</h2>
      <div
        onClick={() => setShowLightbox(true)}
        className="mt-3 p-3 rounded-2xl cursor-pointer bg-white flex items-center justify-center duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      >
        <h3 className="text-2xl text-black">Create a new lobby!</h3>
      </div>
      <div className="flex justify-center w-full px-4 py-2.5 gap-3 flex-wrap">
        {children}
      </div>
    </div>
  );
}

export default LobbyContainer;
