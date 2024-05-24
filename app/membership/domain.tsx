import React from "react";

export interface usersObj {
  userId: string;
  userName: string;
  profilePictureURL: string;
}

export interface CreateMembershipReqBody {
  membershipId: string;
  membershipName: string;
  users: usersObj[];
  validfrom: string;
  validto: string;
}

export interface members {
  cardId: string;
  membershipName: string;
  userName: string;
  userId: string;
  profilePictureURL: string;
  validfrom: string;
  validto: string;
}
export interface MembershipStoreState {
  membershipList: members[];
  fetchLoader: boolean;
  fetchError: boolean;
}

export interface extendmembershipReq {
  cardId: string;
  validfrom: string;
  validto: string;
}

export interface optionsDialogProps {
  open: boolean;
  onClose: () => void;
  fromDate: string;
  toDate: string;
  setfromDate: React.Dispatch<React.SetStateAction<string>>;
  settoDate: React.Dispatch<React.SetStateAction<string>>;
  onsave: () => void;
}
