import { CardsAttempt } from "./CardAttempt";

export type Card = {
  documentId: string;
  access: boolean;
  logo: string;
  name: string;
  circleProgressColor: string;
  description: string;
  cards_attempts: CardsAttempt[];
};
