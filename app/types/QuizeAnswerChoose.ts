import { AnswerComponent } from "./AnswerComponents";

export type QuizeAnswerChoose = {
    answer: AnswerComponent;
    chosenAnswer: string;
    chosenAnswersArray: [string];
    currentQuestion: number;
  }