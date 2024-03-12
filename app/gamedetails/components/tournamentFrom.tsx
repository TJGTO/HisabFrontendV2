import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Requiredsign from "../../Common/FormComponents/requiredsign";
import CircularProgress from "@mui/material/CircularProgress";
import Errormessage from "../../Common/FormComponents/errormessage";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import { IRegisterTournamentProps, tournamentFormSchema } from "../domain";

function TournamentForm({
  file,
  getFileFromInput,
  registerSlotLoader,
  onsubmitfn,
}: IRegisterTournamentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tournamentFormSchema),
  });

  const onSubmitofForm = (data: any) => {
    console.log("data", data);
    onsubmitfn(data);
  };
  return (
    <form
      className="space-y-4 md:space-y-6"
      action="#"
      onSubmit={handleSubmit(onSubmitofForm)}
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Position <Requiredsign />
        </label>
        <div className="flex w-full">
          <select
            id="position"
            {...register("position")}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{"Please Select"}</option>
            <option value="Defence">{"Defence"}</option>
            <option value="Midfield">{"Midfield"}</option>
            <option value="Attack">{"Attack"}</option>
            <option value="Keeper">{"Keeper"}</option>
          </select>
        </div>
        {errors && errors.position && (
          <Errormessage message={errors.position.message} />
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Food Type
          <Requiredsign />
        </label>
        <div className="flex w-full">
          <select
            id="foodtype"
            {...register("foodtype")}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{"Please Select"}</option>
            <option value="Veg">{"Veg"}</option>
            <option value="Non-Veg">{"Non-Veg"}</option>
          </select>
        </div>
        {errors && errors.foodtype && (
          <Errormessage message={errors.foodtype.message} />
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Play as <Requiredsign />
        </label>
        <div className="flex w-full">
          <select
            id="player_type"
            {...register("player_type")}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{"Please Select"}</option>
            <option value="Regular Player">{"Regular Player"}</option>
            <option value="Non-Regular Player">{"Non-Regular Player"}</option>
            <option value="Regular Owner">{"Regular Owner"}</option>
            <option value="Non-Regular Owner">{"Non-Regular Owner"}</option>
          </select>
        </div>
        {errors && errors.player_type && (
          <Errormessage message={errors.player_type.message} />
        )}
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Upload Payment Screenshot <Requiredsign />
      </label>
      <FileUploadSection fileObject={file} setFunction={getFileFromInput} />

      <button
        type="submit"
        disabled={!file}
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {registerSlotLoader ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default TournamentForm;
