import { AnswerAttemptQuize } from "./AnswerAttemptQuize";

export type QuizeAnswerChoose = {
  answer: AnswerAttemptQuize;
  chosenAnswer: string;
  chosenAnswersArray: [string];
  currentQuestion: number;
};
