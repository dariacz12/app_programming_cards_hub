import { AnswerAttemt } from "../types/AnswerAttemt";

export const getCombinedQuizeAnswers = (
  answersResultCurrentAttempt: AnswerAttemt[],
  lastQuizAttemptsResultAnswers: AnswerAttemt[],
) => {
  const lastAttemptAnswers =
    lastQuizAttemptsResultAnswers.length > 0
      ? lastQuizAttemptsResultAnswers
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
