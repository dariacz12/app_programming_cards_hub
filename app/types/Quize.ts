import { QuizAttempt } from "./QuizeAttempt";

export type Quiz = {
  circleProgressColor: string;
  logo: string;
  description: string;
  documentId: string;
  level: number;
  name: string;
  quize_attempts: QuizAttempt[];
}
