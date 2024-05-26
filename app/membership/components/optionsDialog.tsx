import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { optionsDialogProps } from "../domain";
import { getCurrentDate } from "../../Common/functions";

function OptionsDialog({
  open,
  onClose,
  fromDate,
  toDate,
  amount,
  setamount,
  setfromDate,
  settoDate,
  onsave,
}: optionsDialogProps) {
  useEffect(() => {
    if (open) {
      setfromDate("");
      settoDate("");
      setamount("");
    }
  }, [open]);
  const handleClose = () => {
    onClose();
    setfromDate("");
    settoDate("");
  };
  console.log(fromDate, toDate);
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <div className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {"Choose Dates"}
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
                    From Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={getCurrentDate()}
                    onChange={(e) => {
                      e.preventDefault();
                      setfromDate(e.target.value);
                    }}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    To Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    disabled={!fromDate}
                    min={getCurrentDate(fromDate, 1)}
                    onChange={(e) => {
                      e.preventDefault();
                      settoDate(e.target.value);
                    }}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount ( ₹ )
                  </label>
                  <input
                    id="price"
                    type="number"
                    onChange={(e) => {
                      e.preventDefault();
                      setamount(e.target.value);
                    }}
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </form>
          </div>

          <button
            disabled={!(fromDate && toDate)}
            onClick={(e) => {
              e.preventDefault();
              onsave();
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Dates
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default OptionsDialog;
