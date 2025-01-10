import axios from "axios";
import { AnswerAttemt } from "../types/AnswerAttemt";
import { CardsAttempt } from "../types/CardAttempt";
import { CardItem } from "../types/CardItem";
import { UserCardAnswer } from "../types/UserCardAnswer";
import { API_URL } from "../context/AuthContext";
import { getCombinedAnswers } from "../utils/getCombinedAnswers";

export const saveCardsAttempt = async (
  currentUserAnswers: UserCardAnswer[],
  lastCardsAttemptsResultAnswers: AnswerAttemt[],
  cardData: CardItem[],
  lastCardsAttemptsResult: CardsAttempt | undefined,
  documentId: string,
) => {
  let score = 0;
  let incorrect = 0;
  const answersResultCurrentAttempt = currentUserAnswers.map((userAnswer) => {
    const isCorrect = userAnswer.isCorrect;
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

  const totalQuestions = cardData?.length;
  let answersString;
  if (
    Array.isArray(lastCardsAttemptsResultAnswers) &&
    lastCardsAttemptsResultAnswers?.length > 0
  ) {
    const combinedanswers = getCombinedAnswers(
      answersResultCurrentAttempt,
      lastCardsAttemptsResultAnswers,
    );
    answersString = JSON.stringify(combinedanswers);
    lastCardsAttemptsResult && (score = score + lastCardsAttemptsResult?.score);
  } else {
    answersString = JSON.stringify(answersResultCurrentAttempt);
  }

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
