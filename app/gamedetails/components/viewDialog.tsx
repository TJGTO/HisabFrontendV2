import React, { useEffect, useState } from "react";
import { viewDialogProps } from "../domain";
import Dialog from "@mui/material/Dialog";
import RegisterFormField from "./registerForm";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameDetails } from "../../../lib/slices/gamemodule";
import { uploadPaymentSnapAfterAddedByAdmin } from "../service";
import CloseIcon from "@mui/icons-material/Close";
import TournamentForm from "./tournamentFrom";
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
  player_id,
  paymentImageurl,
  actionsPflag,
}: viewDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const [file, setfile] = useState<File>();
  const [loader, setloader] = useState<boolean>(false);
  const [position, setposition] = useState<string>("");
  useEffect(() => {
    if (!open) {
      setfile(undefined);
      setposition("");
    }
  }, [open]);
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
  const getFileFromInput = (fileObj: File) => {
    setfile(fileObj);
  };
  const onSubmitOfForm = async () => {
    try {
      const formData = new FormData();
      let blobdata = file as Blob;
      formData.append(`file`, blobdata);
      formData.append("position", position);
      formData.append("gameid", gameid);
      formData.append("player_id", player_id);
      setloader(true);
      let success: boolean = false;
      let response = await uploadPaymentSnapAfterAddedByAdmin(formData);
      setloader(false);
      if (response.success) {
        success = true;
        dispatch(fetchGameDetails(gameid));
      }
      Swal.fire({
        icon: !success ? "error" : "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleClose();
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
              {paymentImageurl[0] && (
                <div className="flex h-60 w-60">
                  <img
                    src={
                      "https://wfgimagebucket.s3.amazonaws.com/paymentpictures/" +
                      paymentImageurl[0]
                    }
                  />
                </div>
              )}
              {!paymentImageurl[0] && gameDetails?.matchType != "Tournament" ? (
                <RegisterFormField
                  position={position}
                  setposition={setposition}
                  file={file}
                  getFileFromInput={getFileFromInput}
                  registerSlotLoader={loader}
                  onsubmitfn={onSubmitOfForm}
                />
              ) : (
                <TournamentForm
                  file={file}
                  getFileFromInput={getFileFromInput}
                  onsubmitfn={onSubmitOfForm}
                  registerSlotLoader={loader}
                />
              )}

              {paymentImageurl[0] && status == "Paid" && actionsPflag && (
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
