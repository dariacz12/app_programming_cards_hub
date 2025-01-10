import { QuizeAnswer } from "./QuizeAnswer";

export type QuestionItem = {
  documentId: string;
  explanation: string;
  question: string;
  quiz_answer_options: QuizeAnswer[];
};
