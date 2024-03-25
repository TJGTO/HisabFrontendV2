import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

export interface fullviewDialogProps {
  open: boolean;
  imageurl: string;
  headerText: string;
  onClose: () => void;
}
function FullviewpictureDialog({
  open,
  headerText,
  imageurl,
  onClose,
}: fullviewDialogProps) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                {headerText}
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div>
              <img src={imageurl} height={400} width={400} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default FullviewpictureDialog;
