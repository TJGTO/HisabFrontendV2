import { registerDialogProps } from "../domain";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import RegisterFormField from "./registerForm";
import TournamentForm from "./tournamentFrom";
import { registerSlot } from "../../../lib/slices/gamemodule";

function RegisterInGameDialog({
  open,
  onClose,
  gameid,
  matchType,
}: registerDialogProps) {
  const registerSlotLoader = useSelector(
    (state: RootState) => state.gameModel.registerSlotLoader
  );

  const dispatch = useDispatch<AppDispatch>();
  const [file, setfile] = useState<File>();
  const [position, setposition] = useState<string>("");

  const handleClose = () => {
    onClose();
  };

  const updateProfilePicture = async () => {
    const formData = new FormData();
    let blobdata = file as Blob;
    formData.append(`file`, blobdata);
    formData.append("position", position);
    formData.append("gameid", gameid);
    dispatch(registerSlot(formData));
  };
  const getFileFromInput = (fileObj: File) => {
    setfile(fileObj);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={"sm"}
      //className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register
              </h1>

              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div className="w-50">
              <p className="text-sm leading-tight tracking-tight text-gray-900 dark:text-white underline">
                we require your picture, date of birth, and address. If you
                haven't provided this information yet, please visit your profile
                and complete these fields first. While filling in your Instagram
                or Facebook ID is optional, doing so allows us to tag you on
                social media.
              </p>
            </div>

            {matchType && matchType != "Tournament" ? (
              <RegisterFormField
                position={position}
                setposition={setposition}
                file={file}
                getFileFromInput={getFileFromInput}
                registerSlotLoader={registerSlotLoader}
                onsubmitfn={updateProfilePicture}
              />
            ) : (
              <TournamentForm
                file={file}
                getFileFromInput={getFileFromInput}
                onsubmitfn={updateProfilePicture}
                registerSlotLoader={registerSlotLoader}
              />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterInGameDialog;
