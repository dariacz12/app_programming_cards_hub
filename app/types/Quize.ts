import { Logo } from "./Logo";
import { QuizAttempt } from "./QuizeAttempt";

export type Quiz = {
  circleProgressColor: string;
  logo: Logo;
  description: string;
  documentId: string;
  level: number;
  name: string;
  quize_attempts: QuizAttempt[];
};
