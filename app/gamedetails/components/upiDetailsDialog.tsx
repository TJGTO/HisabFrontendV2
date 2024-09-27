import React, { useRef, useState } from "react";
import { paymentDetailsDialogProps } from "../domain";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../../lib/store";
import { useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "../../Common/functions";
import CollectionTable from "./collectionTable";
import Dialog from "@mui/material/Dialog";
import Swal from "sweetalert2";

function UpiDetailsDialog({
  open,
  onClose,
  paymentNo,
  upiId,
  price,
  paymentOptions,
}: paymentDetailsDialogProps) {
  const permissionMatrix = useSelector(
    (state: RootState) => state.gameModel.permissionMatrix
  );
  const [openCollectionTable, setopenCollectionTable] =
    useState<boolean>(false);
  const paymentNORef = useRef(null);
  const handleClose = () => {
    onClose();
  };
  const ifCopyisDoneThenFireTheALert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Copied Successfully",
    });
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
      <div className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Per Head -{" "}
                {paymentOptions && paymentOptions.length > 0
                  ? "Variable"
                  : `₹ ${price}`}
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            {paymentOptions && paymentOptions.length > 0 && (
              <ul>
                {paymentOptions.map((x, index) => (
                  <li key={index}>
                    <p className="text-md font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                      {x.paymentType} - {x.price}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Payment Number
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  id="paymentNo"
                  ref={paymentNORef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={true}
                  value={paymentNo || ""}
                />
              </div>
              <div className="flex-none">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (paymentNo) {
                      let flag = copyToClipboard(paymentNo);
                      if (flag) ifCopyisDoneThenFireTheALert();
                    }
                  }}
                  disabled={!paymentNo}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ContentCopyIcon />
                </button>
              </div>
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              UPI ID
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  id="upiId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={!upiId}
                  value={upiId || ""}
                />
              </div>
              <div className="flex-none">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (upiId) {
                      let flag = copyToClipboard(upiId);
                      if (flag) ifCopyisDoneThenFireTheALert();
                    }
                  }}
                  disabled={!upiId}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ContentCopyIcon />
                </button>
              </div>
            </div>
            {permissionMatrix?.editSetting && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Collection Details
                  </label>
                </div>
                <div
                  className="flex-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setopenCollectionTable(!openCollectionTable);
                  }}
                >
                  {openCollectionTable ? (
                    <KeyboardArrowUpIcon className="bg-blue-500" />
                  ) : (
                    <KeyboardArrowDownIcon className="bg-blue-500" />
                  )}
                </div>
              </div>
            )}
            <div className="w-72 overflow-x-auto">
              {openCollectionTable && <CollectionTable />}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default UpiDetailsDialog;
