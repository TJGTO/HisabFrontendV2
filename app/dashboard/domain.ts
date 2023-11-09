export interface SlidingImageObject {
  URL: string;
}

export interface CardObject {
  cardId: string;
  URL: string;
  venue: string;
  date: string;
  creator: Creator;
}

export type Creator = {
  firstName: string;
  profileImageURL: string;
  id: string;
};
