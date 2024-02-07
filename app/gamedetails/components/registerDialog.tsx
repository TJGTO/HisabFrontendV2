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
import { registerSlot } from "../../../lib/slices/gamemodule";

function RegisterInGameDialog({ open, onClose, gameid }: registerDialogProps) {
  const registerSlotLoader = useSelector(
    (state: RootState) => state.gameModel.registerSlotLoader
  );

  const dispatch = useDispatch<AppDispatch>();
  const [file, setfile] = useState<File>();
  const [position, setposition] = useState<string>("");
  const [positionError, setpositionError] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
  };

  const updateProfilePicture = () => {
    if (!position) {
      setpositionError(true);
      return;
    }
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
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Position
                </label>
                <div className="flex w-full">
                  <select
                    id="position"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setposition(e.target.value);
                      if (!e.target.value) {
                        setpositionError(true);
                      }
                    }}
                  >
                    <option value="">{"Please Select"}</option>
                    <option value="Defence">{"Defence"}</option>
                    <option value="Midfield">{"Midfield"}</option>
                    <option value="Attack">{"Attack"}</option>
                    <option value="Keeper">{"Keeper"}</option>
                  </select>
                </div>
                {positionError && (
                  <Errormessage message={"Please select a position"} />
                )}
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload Payment Screenshot
              </label>
              <FileUploadSection
                fileObject={file}
                setFunction={getFileFromInput}
              />
              {registerSlotLoader ? (
                <button
                  type="submit"
                  disabled={true}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CircularProgress color="secondary" size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfilePicture();
                  }}
                  disabled={!file}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default RegisterInGameDialog;
