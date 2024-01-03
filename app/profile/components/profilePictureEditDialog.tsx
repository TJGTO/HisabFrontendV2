import { settingDialogProps } from "../domain";
import { updateTheUser } from "../../../lib/slices/profileSection";
import { useState, useEffect } from "react";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfileObj } from "../domain";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function EditProfilePictureDialog({ open, onClose }: settingDialogProps) {
  const userProfile = useSelector(
    (state: RootState) => state.profileSection.userProfile
  );
  const dispatch = useDispatch<AppDispatch>();
  const [file, setfile] = useState<File>();

  const handleClose = () => {
    onClose();
  };

  const updateAddress = () => {
    //dispatch(updateTheUser(requestObj));
  };
  const getFileFromInput = (fileObj: File) => {
    console.log("Get the file", fileObj);
    setfile(fileObj);
    const formData = new FormData();
    formData.append(`file`, fileObj);
    console.log("Formdata", formData);
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
                Edit Profile Picture
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <FileUploadSection
                fileObject={file}
                setFunction={getFileFromInput}
              />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("bwfeuib");
                  updateAddress();
                }}
                // disabled={!firstName && !lastName}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default EditProfilePictureDialog;
