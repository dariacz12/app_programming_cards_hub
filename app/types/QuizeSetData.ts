import { QuestionItem } from "./QuizeItem";
import { SliderPhoto } from "./SliderPhoto";

export interface QuizeSetData {
  quiz_questions_elements: QuestionItem[];
  sliderPhotos: SliderPhoto[];
  name: string;
  circleProgressColor: string;
  description: string;
}
