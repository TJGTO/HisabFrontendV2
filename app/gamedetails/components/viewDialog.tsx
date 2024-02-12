import React from "react";
import { viewDialogProps } from "../domain";
import Dialog from "@mui/material/Dialog";
import { RootState } from "../../../lib/store";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

function ViewDialog({
  open,
  onClose,
  gameid,
  setConfirmDialogState,
  setConfirmDialogHeader,
  setConfirmDialogTitle,
  setactionType,
  status,
  paymentImageurl,
  actionsPflag,
}: viewDialogProps) {
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const handleClose = () => {
    onClose();
  };
  const getNumbersofSlotLeft = (): number => {
    if (gameDetails) {
      return (
        gameDetails.number_of_players -
        gameDetails.players.filter((x) => x.status == "Approved").length
      );
    } else {
      return 0;
    }
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
              <div className="flex h-60 w-60">
                <img
                  src={
                    "https://wfgimagebucket.s3.amazonaws.com/paymentpictures/" +
                    paymentImageurl[0]
                  }
                />
              </div>
              {status == "Paid" && actionsPflag && (
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (getNumbersofSlotLeft() <= 0) {
                        Swal.fire({
                          icon: "error",
                          title:
                            "SLot is full if you want to approve more players then please increase the slots",
                          showConfirmButton: false,
                          timer: 2500,
                        });
                        return;
                      }
                      setactionType("Approved");
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
                    onClick={(e) => {
                      e.preventDefault();
                      setactionType("Rejected");
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ViewDialog;
