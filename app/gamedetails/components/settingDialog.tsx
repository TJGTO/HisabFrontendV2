import { useState, useEffect } from "react";
import { settingDialogProps, settingsDialogSchema } from "../domain";
import MultiSelect from "../../Common/FormComponents/multiSelect";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Errormessage from "../../Common/FormComponents/errormessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { updateTheGame } from "../../../lib/slices/gamemodule";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";

function SettingDialog({ open, onClose, gameid }: settingDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(settingsDialogSchema) });

  const dispatch = useDispatch<AppDispatch>();

  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );

  useEffect(() => {
    if (gameDetails) {
      if (gameDetails.price) setValue("price", gameDetails.price);
      if (gameDetails.start_time)
        setValue("start_time", gameDetails.start_time);
      if (gameDetails.end_time) setValue("end_time", gameDetails.end_time);
      if (gameDetails.number_of_players)
        setValue("number_of_players", gameDetails.number_of_players);
      if (gameDetails.paymentNo) setValue("paymentNo", gameDetails.paymentNo);
      if (gameDetails.upiId) setValue("upiId", gameDetails.upiId);
    }
  }, [gameDetails]);

  const onSubmit = (data: any) => {
    console.log(data);
    data.gameid = gameid;
    dispatch(updateTheGame(data));
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
                Settings
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Payment Number
                  </label>
                  <input
                    id="paymentNo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("paymentNo")}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Approver UPI
                  </label>
                  <input
                    id="upiId"
                    className="bg-gray-50 border w-48 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("upiId")}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Time
                  </label>
                  <input
                    id="start_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("start_time")}
                  />
                  {errors && errors.start_time && (
                    <Errormessage message={errors.start_time.message} />
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    End Time
                  </label>
                  <input
                    id="end_time"
                    className="bg-gray-50 border w-48 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("end_time")}
                  />
                  {errors && errors.end_time && (
                    <Errormessage message={errors.end_time.message} />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    No of Slots
                  </label>
                  <input
                    id="number_of_players"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("number_of_players")}
                  />
                  {errors && errors.number_of_players && (
                    <Errormessage message={errors.number_of_players.message} />
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price ( ₹ )
                  </label>
                  <input
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("price")}
                  />
                  {errors && errors.price && (
                    <Errormessage message={errors.price.message} />
                  )}
                </div>
              </div>
              <button
                type="submit"
                //disabled={!checked}
                onClick={(e) => {
                  //e.preventDefault(), dispatch(increment());
                  // console.log("ieruh");
                }}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default SettingDialog;
