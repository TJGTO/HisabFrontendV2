import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
//priceOptionsSchema
function Paymentoptionsinput({
  indexNo,
  removeOptions,
}: {
  indexNo: number;
  removeOptions: (index: number) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div>
        <input
          id="paymentType"
          placeholder="payment type"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <input
          id="price"
          placeholder="price"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mt-1">
        <RemoveCircleOutlineIcon
          onClick={(e) => {
            removeOptions(indexNo);
          }}
          style={{ color: "blue", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default Paymentoptionsinput;
