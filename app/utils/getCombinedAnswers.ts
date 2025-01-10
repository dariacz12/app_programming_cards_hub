import { AnswerAttemt } from "../types/AnswerAttemt";

export const getCombinedAnswers = (
  answersResultCurrentAttempt: AnswerAttemt[],
  lastCardsAttemptsResultAnswers: AnswerAttemt[],
) => {
  const lastAttemptAnswers =
    lastCardsAttemptsResultAnswers.length > 0
      ? lastCardsAttemptsResultAnswers
      : [];

  const currentAttemptAnswers = answersResultCurrentAttempt;
  const correctAnswersFromLastAttempt = lastAttemptAnswers.filter(
    (answer) => answer.isCorrect,
  );
  const correctAnswersFromSecondLastAttempt = currentAttemptAnswers.filter(
    (answer) => answer.isCorrect,
  );
  const incorrectAnswersFromLastAttempt = lastAttemptAnswers.filter(
    (answer) => !answer.isCorrect,
  );
  const combinedAnswersResults = [
    ...correctAnswersFromLastAttempt,
    ...correctAnswersFromSecondLastAttempt,
    ...incorrectAnswersFromLastAttempt,
  ];
  const uniqueAnswers = combinedAnswersResults.filter(
    (answer, index, self) =>
      index === self.findIndex((a) => a.question === answer.question),
  );

  return uniqueAnswers;
};
