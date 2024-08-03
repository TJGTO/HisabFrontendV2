import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { addRabonaCupPlayers } from "../../gamedetails/service";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import CloseIcon from "@mui/icons-material/Close";

function CreateDialog({
  open,
  onClose,
  teamsList,
}: {
  open: boolean;
  onClose: () => void;
  teamsList: any;
}) {
  const [fetchLoader, setfetchLoader] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [file, setfile] = useState<File>();
  const [position, setposition] = useState<string>("");
  const [team, setteam] = useState<string>("");
  const handleClose = () => {
    onClose();
  };

  const getFileFromInput = (fileObj: File) => {
    setfile(fileObj);
  };

  const onSubmitForm = async () => {
    const formData = new FormData();
    let blobdata = file as Blob;
    formData.append(`file`, blobdata);
    formData.append("gameid", "669b72fd7d8cdb2be0102bc2");
    formData.append("name", name);
    formData.append("position", position);
    formData.append("team", team);
    formData.append("age", age);
    setfetchLoader(true);
    let results: any = await addRabonaCupPlayers(formData);
    setfetchLoader(false);
    handleClose();
    Swal.fire({
      icon: !results.success ? "error" : "success",
      title: results.message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <div className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {"Add Player"}
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    id="name"
                    onChange={(e) => {
                      e.preventDefault();
                      setName(e.target.value);
                    }}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Age
                  </label>
                  <input
                    id="age"
                    onChange={(e) => {
                      e.preventDefault();
                      setAge(e.target.value);
                    }}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Position
                  </label>
                  <select
                    id={"Position"}
                    onChange={(e) => {
                      e.preventDefault();
                      setposition(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">{"Please Select"}</option>
                    <option value="Gk">{"Gk"}</option>
                    <option value="Defence">{"Defence"}</option>
                    <option value="Midfield">{"Midfield"}</option>
                    <option value="Attack">{"Attack"}</option>setposition
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Team
                  </label>
                  <select
                    id={"Teams"}
                    onChange={(e) => {
                      e.preventDefault();
                      setteam(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">{"Please Select"}</option>
                    {teamsList.map((x: any, index: number) => (
                      <option key={index} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <FileUploadSection fileObject={file} setFunction={getFileFromInput} />
          {fetchLoader ? (
            <button
              disabled={true}
              onClick={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
              className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CircularProgress color="secondary" size={20} />
            </button>
          ) : (
            <button
              disabled={!file}
              onClick={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
              className="mt-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default CreateDialog;
