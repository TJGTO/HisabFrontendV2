import { settingDialogProps } from "../domain";
import { updateProfilePic } from "../../../lib/slices/profileSection";
import { useState, useEffect } from "react";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfileObj } from "../domain";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function EditProfilePictureDialog({ open, onClose }: settingDialogProps) {
  const userProfile = useSelector(
    (state: RootState) => state.profileSection.userProfile
  );
  const updateLoader = useSelector(
    (state: RootState) => state.profileSection.updateLoader
  );

  const updateMessage = useSelector(
    (state: RootState) => state.profileSection.updateMessage
  );

  const errorOnUpdate = useSelector(
    (state: RootState) => state.profileSection.errorOnUpdate
  );
  const dispatch = useDispatch<AppDispatch>();
  const [file, setfile] = useState<File>();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!updateLoader && updateMessage) {
      if (!errorOnUpdate) handleClose();
      Swal.fire({
        icon: errorOnUpdate ? "error" : "success",
        title: updateMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateLoader, updateMessage]);

  const updateProfilePicture = () => {
    const formData = new FormData();
    let blobdata = file as Blob;
    console.log("blob", blobdata);
    formData.append(`file`, blobdata);
    dispatch(updateProfilePic(formData));
  };
  const getFileFromInput = (fileObj: File) => {
    console.log("Get the file", fileObj);
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
              {updateLoader ? (
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

export default EditProfilePictureDialog;
