import { badgesObj } from "../../profile/domain";

export interface achivementDialogProps {
  open: boolean;
  onClose: () => void;
  data: badgesObj[];
}
