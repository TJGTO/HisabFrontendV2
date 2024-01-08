import * as yup from "yup";

export interface SlidingImageObject {
  URL: string;
}

export interface CardObject {
  cardId: string;
  URL: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  creator: Creator;
}

export type Creator = {
  firstName: string;
  profileImageURL: string;
  id: string;
};
