import * as yup from "yup";
import { ICreator } from "../gamedetails/domain";

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
  creator: ICreator;
  status: string;
  gotoPage: (link: string) => void;
}
