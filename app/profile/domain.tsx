export interface settingDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface addressObj {
  address_line_1: String;
  address_line_2?: String;
  pincode: String;
  city: String;
  state: {
    state_id: String;
    state_name: String;
  };
}

export interface updateProfileObj {
  firstName?: String;
  lastName?: String;
  phone_no?: String;
  email?: String;
  academic?: String;
  profilePictureURL?: String;
  facebook?: String;
  instagram?: String;
  youtube?: String;
  DOB?: String;
  about?: String;
  address?: addressObj;
  isAddress?: boolean;
}

export interface stateObj {
  _id: String;
  stateName: String;
}
export interface ISearchUserObj {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilepictureurl: string;
  name: string;
  DOB: string;
}
export interface ProfileSectionState {
  open: boolean;
  searchLoader: boolean;
  searchUsers: Array<ISearchUserObj>;
  updateLoader: boolean;
  updateMessage: String;
  errorOnUpdate: boolean;
  fetchDetailsLoader: boolean;
  states: Array<stateObj> | null;
  userProfile: updateProfileObj;
  permissionMatrix: {
    editProfile: boolean;
  };
}

export interface ISearchUserReqBody {
  userName?: string;
}
