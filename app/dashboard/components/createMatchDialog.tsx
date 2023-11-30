import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import RegistrationForm from "@/app/registration/components/registrationForm";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreateMatchDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={"md"}
      //className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create a Match
              </h1>
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
            </div>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              //onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Venue
                  </label>
                  <input
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("firstName")}
                  />
                  {/* {errors && errors.firstName && (
                      <Errormessage message={errors.firstName.message} />
                    )} */}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                  </label>
                  <input
                    id="lastName"
                    type="date"
                    className="bg-gray-50 border w-48 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("lastName")}
                  />
                  {/* {errors && errors.lastName && (
                      <Errormessage message={errors.lastName.message} />
                    )} */}
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Time
                  </label>
                  <input
                    id="email"
                    type="time"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("email")}
                  />
                  {/* {errors && errors.email && (
                      <Errormessage message={errors.email.message} />
                    )} */}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    End Time
                  </label>
                  <input
                    id="phoneNo"
                    type="time"
                    className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("phoneNo")}
                  />
                  {/* {errors && errors.phoneNo && (
                      <Errormessage message={errors.phoneNo.message} />
                    )} */}
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    No of Players
                  </label>
                  <input
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("email")}
                  />
                  {/* {errors && errors.email && (
                      <Errormessage message={errors.email.message} />
                    )} */}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price ( ₹ )
                  </label>
                  <input
                    id="phoneNo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //{...register("phoneNo")}
                  />
                  {/* {errors && errors.phoneNo && (
                      <Errormessage message={errors.phoneNo.message} />
                    )} */}
                </div>
              </div>
              <div>
                <FileUploadSection />
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CreateMatchDialog;
