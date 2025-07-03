import "./App.css";
import { useSocket } from "./hooks/useSocket";
import { FaCircle } from "react-icons/fa";

function App() {
  const { isConnected } = useSocket();

  return (
    <div className="flex  items-center">
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
  );
}

export default App;
