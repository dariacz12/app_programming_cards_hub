import axios from "axios";
import { API_URL } from "../context/AuthContext";
import { CardSetData } from "../types/CardSetData";

export const resetCards = async (
  cardData: CardSetData | undefined,
  documentId: string,
) => {
  if (!cardData) {
    console.error("cardData is undefined. Cannot reset cards.");
    return;
  }

  const totalQuestions = cardData?.cards_items?.length;
  let score = 0;
  let incorrect = totalQuestions;
  const answersResultCurrentAttempt = cardData?.cards_items.map((question) => {
    return {
      question: question.documentId,
      isCorrect: false,
    };
  });
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

  return await axios.post(`${API_URL}/cards-attempts`, cardsAttempt);
};
