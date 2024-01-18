import React from "react";
import { viewDialogProps } from "../domain";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

function ViewDialog({
  open,
  onClose,
  gameid,
  setConfirmDialogState,
  setConfirmDialogHeader,
  setConfirmDialogTitle,
  setactionType,
}: viewDialogProps) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Details
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="flex w-full">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzuCZ5ntitJcOHywP_ECjin8aYem_v-nXnUdZMSivjA&s"
                  }
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setactionType("Approve");
                    setConfirmDialogState(true);
                    setConfirmDialogHeader("Do You really want to Approve?");
                    setConfirmDialogTitle("");
                  }}
                  disabled={false}
                  className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Approve
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setactionType("Reject");
                    setConfirmDialogState(true);
                    setConfirmDialogState(true);
                    setConfirmDialogHeader("Do You really want to Reject?");
                    setConfirmDialogTitle("");
                  }}
                  disabled={false}
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ViewDialog;
