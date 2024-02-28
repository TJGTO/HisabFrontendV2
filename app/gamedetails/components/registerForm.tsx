import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Errormessage from "../../Common/FormComponents/errormessage";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import { IRegisterFormProps } from "../domain";

function RegisterFormField({
  position,
  setposition,
  file,
  getFileFromInput,
  registerSlotLoader,
  onsubmitfn,
}: IRegisterFormProps) {
  const [positionError, setpositionError] = useState<boolean>(false);
  const onSubmitofForm = () => {
    if (!position) {
      setpositionError(true);
      return;
    }
    onsubmitfn();
  };
  return (
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
        {positionError && <Errormessage message={"Please select a position"} />}
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Upload Payment Screenshot
      </label>
      <FileUploadSection fileObject={file} setFunction={getFileFromInput} />
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
            onSubmitofForm();
          }}
          disabled={!file}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default RegisterFormField;
