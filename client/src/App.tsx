import "./App.css";
import { useSocket } from "./hooks/useSocket";
import { FaCircle } from "react-icons/fa";

function App() {
  const { isConnected, message } = useSocket();

  return (
    <div className="flex flex-col  items-center">
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

      <h2 className="ml-3">
        Message from the backend - <span className="font-bold">{message}</span>
      </h2>
    </div>
  );
}

export default App;
