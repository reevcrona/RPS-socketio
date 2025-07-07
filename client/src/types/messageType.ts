export type MessageData = {
  id: string;
  content: string;
  createAt: string;
};

export type MessageResponse = {
  data: MessageData[];
};
