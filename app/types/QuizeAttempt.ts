import { AnswerAttemt } from "./AnswerAttemt";
import { Quiz } from "./Quize";
export type QuizAttempt = {
  answers: AnswerAttemt[];
  quize: Quiz;
  incorrectAnswers: number;
  score: number;
  totalQuestions: number;
};
