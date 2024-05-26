import React, { useState } from "react";
import { createSortFromForAvator, stringToColor } from "../../Common/functions";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2";
import ConfirmDialog from "../../Common/ConfirmDialog/confirmDialog";
import { fetchmembershipcards } from "../../../lib/slices/membership";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import { members, extendmembershipReq } from "../domain";
import OptionsDialog from "./optionsDialog";
import { extendMembership, removeMembership } from "../service";

function Mcard({
  cardId,
  membershipName,
  userName,
  userId,
  validfrom,
  validto,
  membershipCardId,
  profilePictureURL,
}: members) {
  const [open, setopen] = useState<boolean>(false);
  const [openOptions, setopenOptions] = useState<boolean>(false);
  const [headerTest, setheaderTest] = useState<string>("");
  const [action, setaction] = useState<string>("");
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settoDate] = useState<string>("");
  const [amount, setamount] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const closeConfirmDialog = () => {
    setopen(false);
  };
  const closeOPtionsDialog = () => {
    setopenOptions(false);
  };
  const onsaveOptions = () => {
    setopenOptions(false);
    if (action == "extend") {
      setopen(true);
      setheaderTest("Do you want to extend?");
    }
  };
  const submitextendmembership = async () => {
    const reqbody: extendmembershipReq = {
      validfrom: fromDate,
      validto: toDate,
      cardId: cardId,
      amount: amount,
    };
    let response;
    try {
      if (action == "extend") {
        response = await extendMembership(reqbody);
        Swal.fire({
          icon: response.success ? "success" : "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (action == "remove") {
        response = await removeMembership(cardId);
        Swal.fire({
          icon: response.success ? "success" : "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      dispatch(fetchmembershipcards());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update the record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-2 pt-2">
        <div className={`h-3.5 w-3.5 rounded-full bg-green-300 mr-2`}></div>
      </div>
      <div className="flex flex-col items-center pb-6 mt-2">
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: userName ? stringToColor(userName.toString()) : "",
          }}
          src={
            "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
            profilePictureURL
          }
        >
          {userName && createSortFromForAvator(userName.toString())}
        </Avatar>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {membershipCardId}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          From - {validfrom}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          To - {validto}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            onClick={(e) => {
              setopenOptions(true);
              setaction("extend");
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            Extend
          </a>
          <a
            onClick={(e) => {
              setopen(true);
              setheaderTest("Do you want to remove?");
              setaction("remove");
            }}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          >
            Remove
          </a>
        </div>
      </div>
      <ConfirmDialog
        open={open}
        headerText={headerTest}
        titleText=""
        onClose={closeConfirmDialog}
        onConfirm={submitextendmembership}
      />
      <OptionsDialog
        open={openOptions}
        onClose={closeOPtionsDialog}
        fromDate={fromDate}
        toDate={toDate}
        amount={amount}
        setamount={setamount}
        setfromDate={setfromDate}
        settoDate={settoDate}
        onsave={onsaveOptions}
      />
    </div>
  );
}

export default Mcard;
