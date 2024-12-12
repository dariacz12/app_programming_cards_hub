import { CardsAttempt } from "../screens/CardsStudyPage";

export interface Card {
  documentId: string;
  access: boolean;
  logo: string;
  name: string;
  circleProgressColor: string;
  description: string;
  cards_attempts: CardsAttempt[];
}
