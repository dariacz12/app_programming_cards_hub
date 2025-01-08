import { AnswerAttemt } from "./AnswerAttemt";
import { CardSetData } from "./CardSetData";

export type CardsAttempt = {
  answers: AnswerAttemt[];
  card: CardSetData;
  incorrectAnswers: number;
  score: number;
  totalQuestions: number;
};
