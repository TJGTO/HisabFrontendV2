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
