import { CardItem } from "./CardItem";
import { CardsCategoryProps } from "./CardsCategoryProps";
import { SliderPhoto } from "./SliderPhoto";

export interface CardSetData {
  name: string;
  logo: {
    url: string;
  };
  cards_items: CardItem[];
  documentId: string;
  sliderPhotos: SliderPhoto[];
  description: string;
  circleProgressColor: string;
  cards_categories: CardsCategoryProps[];
}
