import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { MessageResponse } from "../types/messageType";

const fetchMessages = async () => {
  const response = await axios.get<MessageResponse>(
    "http://localhost:3000/messages"
  );
  console.log(response.data.data);

  return response.data.data;
};

function MessageList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ul>{data && data.map((msg) => <li key={msg.id}>{msg.content}</li>)}</ul>
  );
}

export default MessageList;
