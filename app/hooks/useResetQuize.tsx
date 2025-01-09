import axios from "axios";
import { AnswerAttemt, QuestionData } from "../screens/QuizeQuestion";
import { API_URL } from "../context/AuthContext";
import { QuestionItem } from "../types/QuizeItem";

export const useResetQuize = async (
  navigation: any,
  questionsList: QuestionItem[],
  userId: number,
  documentId: string,
) => {
  try {
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

    const response = await axios.post(`${API_URL}/quize-attempts`, quizAttempt);
    if (response.status === 200) {
      console.log("Wynik quizu zapisany:", response.data);
    } else {
      console.error("Failed to save quiz result, status:", response.status);
      console.error("Error response:", response.data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
    } else if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
  navigation.navigate("QuizeQuestion", {
    documentId: documentId,
    reset: true,
  });
};
