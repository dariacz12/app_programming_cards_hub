import axios from "axios";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { QuizAttempt } from "../types/QuizeAttempt";
import { QuizeSetData } from "../types/QuizeSetData";
import { UserQuizeAnswer } from "../types/UserQuizeAnswer";
import { getCombinedQuizeAnswers } from "../utils/getCombinedQuizeAnswers";
import { API_URL } from "../context/AuthContext";
import { LastQuizAttemptsResult } from "../types/lastQuizAttemptsResult";

export const saveQuizAttempt = async (
  userAnswers: UserQuizeAnswer[],
  correctAnswers: UserQuizeAnswer[],
  quizeSetData: QuizeSetData,
  lastQuizAttemptsResultAnswers: AnswerAttemt[],
  lastQuizAttemptsResult: LastQuizAttemptsResult,
  documentId: string,
) => {
  let score = 0;
  let incorrect = 0;
  const answersResultCurrentAttempt = userAnswers.map((userAnswer) => {
    const isCorrect =
      correctAnswers?.some(
        (correctAnswer) =>
          correctAnswer.questionId === userAnswer.questionId &&
          correctAnswer.answerId === userAnswer.answerId,
      ) || false;

    if (isCorrect) {
      score++;
    } else {
      incorrect++;
    }

    return {
      question: userAnswer.questionId,
      isCorrect,
    };
  });

  const totalQuestions = quizeSetData?.quiz_questions_elements?.length;
  let answersString;
  if (
    Array.isArray(lastQuizAttemptsResultAnswers) &&
    lastQuizAttemptsResultAnswers?.length > 0
  ) {
    const combinedanswers = getCombinedQuizeAnswers(
      answersResultCurrentAttempt,
      lastQuizAttemptsResultAnswers,
    );
    answersString = JSON.stringify(combinedanswers);
    lastQuizAttemptsResult && (score = score + lastQuizAttemptsResult?.score);
  } else {
    answersString = JSON.stringify(answersResultCurrentAttempt);
  }
  const quizAttempt = {
    data: {
      quize: documentId,
      answers: answersString,
      score,
      totalQuestions,
      incorrectAnswers: incorrect,
    },
  };
  return await axios.post(`${API_URL}/quize-attempts`, quizAttempt);
};
