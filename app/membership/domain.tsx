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
  amount: string;
  validto: string;
}

export interface members {
  cardId: string;
  membershipName: string;
  membershipCardId: string;
  userName: string;
  userId: string;
  profilePictureURL: string;
  validfrom: string;
  validto: string;
}

export type cardtype = "active" | "inactive";

export interface MembershipStoreState {
  membershipList: members[];
  fetchLoader: boolean;
  fetchError: boolean;
  totalCount: number;
  searching: boolean;
  flag: cardtype;
}

export interface extendmembershipReq {
  cardId: string;
  validfrom: string;
  validto: string;
  amount: string;
}

export interface optionsDialogProps {
  open: boolean;
  onClose: () => void;
  fromDate: string;
  toDate: string;
  amount: string;
  setamount: React.Dispatch<React.SetStateAction<string>>;
  setfromDate: React.Dispatch<React.SetStateAction<string>>;
  settoDate: React.Dispatch<React.SetStateAction<string>>;
  onsave: () => void;
}

export interface fetchMenbershipCardsReqBody {
  flag: cardtype;
  skip: number;
  limit: number;
  searchString?: string;
}

export interface searchMembershipCardsBody extends fetchMenbershipCardsReqBody {
  searchString: string;
}
export interface searchBoxProps {
  setskip: React.Dispatch<React.SetStateAction<number>>;
  setpage: React.Dispatch<React.SetStateAction<number>>;
  paginationdata: fetchMenbershipCardsReqBody;
}

export interface mcardprops extends members {
  paginationdata: fetchMenbershipCardsReqBody;
}

export const maxUserNameLength = 15;
