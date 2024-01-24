import * as yup from "yup";
import React from "react";

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

export interface viewDialogProps extends settingDialogProps {
  setConfirmDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDialogHeader: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  setactionType: React.Dispatch<React.SetStateAction<string>>;
  status: string;
}

export interface createTeamDialogProps extends settingDialogProps {}

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

type Status = "Approved" | "Rejected" | "Withdrawn" | "Removed" | "Paid";

export interface Iplayers {
  name: string;
  player_id: string;
  age: string;
  profilepictureurl: string;
  rating?: string;
  phoneNumber: string;
  position: Position;
  status: Status;
  team?: string;
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

export interface updatePlayerStatusReqBody {
  gameId: string;
  playerId: string;
  status: string;
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
  player_id: string;
  status: Status;
};

export const colorListforStatus = {
  Approved: "text-green-700",
  Rejected: "text-red-700",
  Withdrawn: "text-orange-700",
  Removed: "text-gray-700",
  Paid: "text-blue-700",
};

export const colorListforStatusBG = {
  Approved: "bg-green-300",
  Rejected: "bg-red-300",
  Withdrawn: "bg-orange-300",
  Removed: "bg-gray-300",
  Paid: "bg-blue-300",
};

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
