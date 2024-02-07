import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

export interface confirmDialogProps {
  open: boolean;
  headerText: string;
  titleText: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

function ConfirmDialog({
  open,
  headerText,
  titleText,
  onClose,
  onConfirm,
  onCancel,
}: confirmDialogProps) {
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
            <div className="space-y-4 md:space-y-6">
              <DialogTitle className="text-gray-900 text-sm dark:text-white">
                {titleText}
              </DialogTitle>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onConfirm();
                    onClose();
                  }}
                  disabled={false}
                  className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  OK
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (onCancel) {
                      onCancel();
                    }

                    onClose();
                  }}
                  disabled={false}
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;
