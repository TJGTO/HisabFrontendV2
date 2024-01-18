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
export interface BasicDialogProps {
  open: boolean;
  onClose: () => void;
}
export interface settingDialogProps extends BasicDialogProps {
  gameid: string;
}
export interface registerDialogProps extends settingDialogProps {}

export interface paymentDetailsDialogProps extends BasicDialogProps {
  paymentNo?: string;
  upiId?: string;
}

export interface activeGamesObj {
  gameId: string;
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
  paymentNo?: string;
  upiId?: string;
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
  gameDetailsLoader: boolean;
  gameCreationMessage: string;
  activeGames: Array<activeGamesObj>;
  gameDetails: IgameDetailsObj | null;
  messageBoxFlag: boolean;
  messageBoxMessage: string;
  messageboxType: string;
  registerSlotLoader: boolean;
}

export interface createGameReqBody {
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
}

export interface updateGameReqBody {
  gameid: string;
  upiId?: string;
  paymentNo?: string;
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

export const settingsDialogSchema = yup.object({
  upiId: yup.string(),
  paymentNo: yup.string(),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  number_of_players: yup
    .number()
    .required("Please enter a valid number")
    .typeError("No of slots are required"),
  price: yup
    .number()
    .required("Please enter a valid price")
    .typeError("Pricing is required"),
});

export type PlayerObjinGameList = {
  profilepictureurl: string;
  name: string;
  age: string;
  phoneNumber: string;
  position: string;
  classes: string;
  gameId: string;
};
