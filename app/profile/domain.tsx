export interface settingDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface updateProfileObj {
  firstName?: String;
  lastName?: String;
  phone_no?: String;
  email?: String;
  academic?: String;
  facebook?: String;
  instagram?: String;
  youtube?: String;
  DOB?: String;
  about?: String;
}

export interface ProfileSectionState {
  open: boolean;
  updateLoader: boolean;
  updateMessage: String;
  errorOnUpdate: boolean;
  userProfile: updateProfileObj;
}
