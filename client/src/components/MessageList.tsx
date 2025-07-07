import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMessages = async () => {
  const response = axios.get("http://localhost:3000/messages");
  return response;
};

function MessageList() {
  return <></>;
}

export default MessageList;
