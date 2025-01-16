export type User = {
  username: string;
  documentId: string;
  email: string;
  id: number;
  avatar: {
    documentId: string;
    url: string;
  };
};
