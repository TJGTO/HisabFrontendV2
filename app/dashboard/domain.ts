import { ICreator } from "../gamedetails/domain";
import { NewCardObject } from "../news/domain";

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

export interface NewsCardProps extends NewCardObject {
  gotoPage: (link: string) => void;
}
export const newsArr: NewCardObject[] = [
  {
    _id: "1",
    title: "Best practices for successful prototypes",
    createdAt: "23/12/2023",
    updatedAt: "",
    createdBy: "Tathagata Mondal",
    profilePictureURL: "Tathagata_Mondal_2024-02-12_11%3A25%3A32.044Z",
  },
  {
    _id: "2",
    title: "Design Patterns in Node.js",
    createdAt: "12/02/2024",
    updatedAt: "",
    createdBy: "Tathagata Mondal",
    profilePictureURL: "Tathagata_Mondal_2024-02-12_11%3A25%3A32.044Z",
  },
];
