import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { Card } from "../screens/CardsStudyPage";

export const resetCards = async (
  cardData: Card | undefined,
  documentId: string,
  navigation: any,
) => {
  if (!cardData) {
    console.error("cardData is undefined. Cannot reset cards.");
    return;
  }
  try {
    const totalQuestions = cardData?.cards_items?.length;
    let score = 0;
    let incorrect = totalQuestions;
    const answersResultCurrentAttempt = cardData?.cards_items.map(
      (question) => {
        return {
          question: question.documentId,
          isCorrect: false,
        };
      },
    );
    const answersString = JSON.stringify(answersResultCurrentAttempt);
    const cardsAttempt = {
      data: {
        card: documentId,
        answers: answersString,
        score,
        totalQuestions,
        incorrectAnswers: incorrect,
      },
    };
    console.log("111cardsAttempt", cardsAttempt);
    const response = await axios.post(
      `${API_URL}/cards-attempts`,
      cardsAttempt,
    );
    if (response.status === 200) {
      console.log("Wynik cardAttempt zapisany:", response.data);
    } else {
      console.error("Failed to save  result, status:", response.status);
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
  navigation.navigate("CardsStudyPage", {
    documentId: documentId,
    reset: true,
  });
};
