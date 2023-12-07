import { boolean } from "yup";

export type tabsObject = {
  label: string;
  value: string;
  clicked: boolean;
};

export interface settingDialogProps {
  open: boolean;
  onClose: () => void;
}
