import * as yup from "yup";
import React from "react";
import { ISearchUserObj } from "../profile/domain";

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

export interface venueObj {
  venueId: string;
  fieldName: string;
}
export interface VenueDetailsforCard extends venueObj {
  images: string[];
  location?: string;
}
export interface teamConfigObj {
  teamKey: string;
  name: string;
}
export interface addPlayersDialogProps extends settingDialogProps {}

export interface registerDialogProps extends settingDialogProps {
  matchType?: string;
}

export interface viewDialogProps extends settingDialogProps {
  setConfirmDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDialogHeader: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  setactionType: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  player_id: string;
  actionsPflag?: boolean;
  paymentImageurl: string[];
}

export interface createTeamDialogProps extends settingDialogProps {
  editPermission: boolean;
}

export interface IPaymentOptionsObj {
  paymentType: string;
  price: number;
}
export interface paymentDetailsDialogProps extends BasicDialogProps {
  paymentNo?: string;
  upiId?: string;
  price?: number;
  paymentOptions?: Array<IPaymentOptionsObj>;
}

export interface ICreator {
  _id: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
}

export interface IPaymentOptionsObj {
  paymentType: string;
  price: number;
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
  venueDetails: VenueDetailsforCard;
  number_of_teams?: number;
  status: string;
  matchType?: string;
  creator?: ICreator;
  paymentOptions?: IPaymentOptionsObj[];
}

type Status =
  | "Added"
  | "Approved"
  | "Rejected"
  | "Withdrawn"
  | "Removed"
  | "Paid";

export interface Iplayers {
  name: string;
  player_id: string;
  age: string;
  profilepictureurl: string;
  paymentImageurl: string[];
  rating?: string;
  phoneNumber: string;
  position: Position;
  status: Status;
  team?: string;
  player_type?: string;
  foodtype?: string;
}

export interface IgameDetailsObj extends activeGamesObj {
  players: Iplayers[];
}
export type GamePermissionMatrix = {
  editSetting: boolean;
  approveOrReject: boolean;
  editTeam: boolean;
  player_id: string;
};
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
  venueList: Array<venueObj>;
  permissionMatrix: GamePermissionMatrix;
}

export interface createGameReqBody {
  venue: string;
  date: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
  matchType: string;
}

export interface updateGameReqBody {
  gameid: string;
  upiId?: string;
  paymentNo?: string;
  start_time: string;
  end_time: string;
  number_of_players: number;
  price: number;
  status: string;
}

export interface updatePlayerStatusReqBody {
  gameId: string;
  playerId: string;
  status: string;
  phoneNo: string;
}
export const createMatchSchema = yup.object({
  venue: yup.string().trim().required("Venue is required"),
  date: yup.date().required("Date is required").typeError("Date is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup.string().required("End time is required"),
  matchType: yup.string().required("Match Type id required"),
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
  status: yup.string().required("Status is required"),
  number_of_players: yup
    .number()
    .required("Please enter a valid number")
    .typeError("No of slots are required"),
  price: yup
    .number()
    .required("Please enter a valid price")
    .typeError("Pricing is required"),
});
export const priceOptionsSchema = yup.object({
  paymentType: yup.string().required(),
  price: yup
    .number()
    .required("Please enter a valid price")
    .typeError("Pricing is required"),
});
export const tournamentFormSchema = yup.object({
  position: yup.string().trim().required("postion is required"),
  foodtype: yup.string().required("foodtype is required"),
  player_type: yup.string().required("player type is required"),
});
export type PlayerObjinGameList = {
  profilepictureurl: string;
  name: string;
  age: string;
  paymentImageurl: string[];
  phoneNumber: string;
  position: string;
  classes: string;
  gameId: string;
  player_id: string;
  status: Status;
  team?: string;
  player_type?: string;
  foodtype?: string;
  matchType?: string;
  slno?: number;
};
export type IUpdateTeamReqObj = {
  gameId: string;
  teams: Iplayers[];
  number_of_teams: number;
};
export interface ISearchUserModifiedObj extends ISearchUserObj {
  added: boolean;
}
export interface IadduserToGameReqBody {
  gameid: string;
  players: ISearchUserModifiedObj[];
}

export interface IRegisterFormProps {
  position: string;
  setposition: React.Dispatch<React.SetStateAction<string>>;
  file: File | undefined;
  getFileFromInput: (fileObj: File) => void;
  registerSlotLoader: boolean;
  onsubmitfn: () => Promise<void>;
}
export interface IRegisterTournamentProps {
  file: File | undefined;
  getFileFromInput: (fileObj: File) => void;
  registerSlotLoader: boolean;
  onsubmitfn: (data: any) => Promise<void>;
}
export const colorListforStatus = {
  Approved: "text-green-700",
  Rejected: "text-red-700",
  Withdrawn: "text-orange-700",
  Removed: "text-gray-700",
  Paid: "text-blue-700",
  Added: "text-purple-700",
};

export const colorListforStatusBG = {
  Approved: "bg-green-300",
  Rejected: "bg-red-300",
  Withdrawn: "bg-orange-300",
  Removed: "bg-gray-300",
  Paid: "bg-blue-300",
  Added: "bg-purple-300",
};

export const gameStatusArr: Array<string> = [
  "Inactive",
  "Active",
  "Cancelled",
  "Removed",
  "Completed",
];
export const timingsArray: string[] = [
  "12:00 AM",
  "12:15 AM",
  "12:30 AM",
  "12:45 AM",
  "01:00 AM",
  "01:15 AM",
  "01:30 AM",
  "01:45 AM",
  "02:00 AM",
  "02:15 AM",
  "02:30 AM",
  "02:45 AM",
  "03:00 AM",
  "03:15 AM",
  "03:30 AM",
  "03:45 AM",
  "04:00 AM",
  "04:15 AM",
  "04:30 AM",
  "04:45 AM",
  "05:00 AM",
  "05:15 AM",
  "05:30 AM",
  "05:45 AM",
  "06:00 AM",
  "06:15 AM",
  "06:30 AM",
  "06:45 AM",
  "07:00 AM",
  "07:15 AM",
  "07:30 AM",
  "07:45 AM",
  "08:00 AM",
  "08:15 AM",
  "08:30 AM",
  "08:45 AM",
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "09:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "01:45 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "02:45 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "03:45 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "04:45 PM",
  "05:00 PM",
  "05:15 PM",
  "05:30 PM",
  "05:45 PM",
  "06:00 PM",
  "06:15 PM",
  "06:30 PM",
  "06:45 PM",
  "07:00 PM",
  "07:15 PM",
  "07:30 PM",
  "07:45 PM",
  "08:00 PM",
  "08:15 PM",
  "08:30 PM",
  "08:45 PM",
  "09:00 PM",
  "09:15 PM",
  "09:30 PM",
  "09:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM",
];
