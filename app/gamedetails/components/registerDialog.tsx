import { registerDialogProps } from "../domain";
import { updateProfilePic } from "../../../lib/slices/profileSection";
import { useState, useEffect } from "react";
import Errormessage from "../../Common/FormComponents/errormessage";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import RegisterFormField from "./registerForm";
import { registerSlot } from "../../../lib/slices/gamemodule";

function RegisterInGameDialog({ open, onClose, gameid }: registerDialogProps) {
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
      maxWidth={"md"}
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
            <RegisterFormField
              position={position}
              setposition={setposition}
              file={file}
              getFileFromInput={getFileFromInput}
              registerSlotLoader={registerSlotLoader}
              onsubmitfn={updateProfilePicture}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterInGameDialog;
