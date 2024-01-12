import * as yup from "yup";

export type tabsObject = {
  label: string;
  value: string;
  clicked: boolean;
};

export enum Position {
  Defence,
  Midfield,
  Attack,
  Keeper,
}

export interface settingDialogProps {
  open: boolean;
  onClose: () => void;
}
export interface registerDialogProps extends settingDialogProps {
  gameid: string;
}

export interface activeGamesObj {
  gameId: string;
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
}

export interface Iplayers {
  name: string;
  player_id: string;
  age: string;
  profilepictureurl: string;
  rating?: string;
  phoneNumber: string;
  position: Position;
}

export interface IgameDetailsObj extends activeGamesObj {
  players: Iplayers[];
}

export interface gameModelStateObj {
  gameLoader: boolean;
  errorOnCreation: boolean;
  gameCreationMessage: string;
  activeGames: Array<activeGamesObj>;
  gameDetails: IgameDetailsObj | null;
  messageBoxFlag: boolean;
  messageBoxMessage: string;
  messageboxType: string;
}

export interface createGameReqBody {
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
}

export const createMatchSchema = yup.object({
  venue: yup.string().trim().required("Venue is required"),
  date: yup.date().required("Date is required").typeError("Date is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  number_of_players: yup
    .number()
    .required("No of players are required")
    .typeError("No of players are required"),
  price: yup
    .number()
    .required("Pricing is required")
    .typeError("Pricing is required"),
});
