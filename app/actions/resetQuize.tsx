import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { QuestionItem } from "../types/QuizeItem";
import { AnswerAttemt } from "../types/AnswerAttemt";

export const resetQuize = async (
  questionsList: QuestionItem[],
  userId: number,
  documentId: string,
) => {
  const answersAllFalse = questionsList
    ?.map((question) => {
      return {
        question: question.documentId,
        isCorrect: false,
      };
    })
    .filter((answer) => answer !== null) as AnswerAttemt[];

  let answersString = JSON.stringify(answersAllFalse);
  const quizAttempt = {
    data: {
      users_permissions_user: userId,
      quize: documentId,
      answers: answersString,
      score: 0,
      totalQuestions: questionsList?.length,
      incorrectAnswers: questionsList?.length,
    },
  };

  return axios.post(`${API_URL}/quize-attempts`, quizAttempt);
};
