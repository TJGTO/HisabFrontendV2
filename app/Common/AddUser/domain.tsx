import { ISearchUserModifiedObj } from "../../gamedetails/domain";
export interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onsave: (userlist: ISearchUserModifiedObj[]) => void;
  dialogTitle: string;
}
