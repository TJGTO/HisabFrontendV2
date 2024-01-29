import * as React from "react";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { timingsArray } from "../../gamedetails/domain";
import CircularProgress from "@mui/material/CircularProgress";
import Errormessage from "../../Common/FormComponents/errormessage";
import { getCurrentDate, fromatDate } from "../../Common/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMatchSchema } from "../../gamedetails/domain";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { createTheGame, fetchVenueList } from "../../../lib/slices/gamemodule";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreateMatchDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const dispatch = useDispatch<AppDispatch>();
  const openFlag = useSelector((state: RootState) => state.dashboard.open);
  const gameLoader = useSelector(
    (state: RootState) => state.gameModel.gameLoader
  );
  const venueList = useSelector(
    (state: RootState) => state.gameModel.venueList
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createMatchSchema) });

  const handleClose = () => {
    onClose();
  };
  React.useEffect(() => {
    if (props.open && venueList.length <= 0) {
      dispatch(fetchVenueList());
    }
  }, [props.open]);

  React.useEffect(() => {
    console.log("venueList", venueList);
  }, [venueList]);

  React.useEffect(() => {
    if (!openFlag) {
      handleFormReset();
    }
  }, [openFlag]);

  const handleFormReset = () => {
    reset({
      venue: "",
      start_time: "",
      end_time: "",
      price: 0,
      number_of_players: 0,
      date: new Date(),
    });
  };

  const onSubmit = (data: any) => {
    let formattedDate = fromatDate(data.date);
    data.date = formattedDate;
    if (
      timingsArray.indexOf(data.start_time) >=
      timingsArray.indexOf(data.end_time)
    ) {
      Swal.fire({
        icon: "error",
        title: "End time can'tbe same or earlier than Start time",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    dispatch(createTheGame(data));
  };
  const [value, onChange] = React.useState<string>("10:00");
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={"md"}
      //className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a Match
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
                    Venue
                  </label>
                  <input
                    id="venue"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("venue")}
                  />
                  {errors && errors.venue && (
                    <Errormessage message={errors.venue.message} />
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={getCurrentDate()}
                    className="bg-gray-50 border w-48 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("date")}
                  />
                  {errors && errors.date && (
                    <Errormessage message={errors.date.message} />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Time
                  </label>
                  <select
                    id="start_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("start_time")}
                  >
                    <option value="">{"Please Select"}</option>
                    {timingsArray.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                  {errors && errors.start_time && (
                    <Errormessage message={errors.start_time.message} />
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    End Time
                  </label>
                  <select
                    id="end_time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("end_time")}
                  >
                    <option value="">{"Please Select"}</option>
                    {timingsArray.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                  {errors && errors.end_time && (
                    <Errormessage message={errors.end_time.message} />
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    No of Players
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
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("price")}
                  />
                  {errors && errors.price && (
                    <Errormessage message={errors.price.message} />
                  )}
                </div>
              </div>
              {gameLoader ? (
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
                  //disabled={!checked}
                  onClick={(e) => {
                    //e.preventDefault(), dispatch(increment());
                  }}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CreateMatchDialog;
