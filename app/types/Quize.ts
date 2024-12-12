import { QuizAttempt } from "../screens/QuizeQuestion";

export interface Quiz {
  circleProgressColor: string;
  logo: string;
  description: string;
  documentId: string;
  level: number;
  name: string;
  quize_attempts: QuizAttempt[];
}
