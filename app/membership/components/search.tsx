import React, { useState } from "react";
import {
  usersObj,
  CreateMembershipReqBody,
  searchBoxProps,
  fetchMenbershipCardsReqBody,
} from "../domain";
import AdduserDialog from "../../Common/AddUser/adduser";
import { ISearchUserModifiedObj } from "../../gamedetails/domain";
import { createMembershipRecords } from "../service";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import OptionsDialog from "./optionsDialog";
import { initcapString } from "../../Common/functions";
import {
  fetchmembershipcards,
  setFlag,
  resetMembershipData,
} from "../../../lib/slices/membership";
import { Typography, Avatar, Tooltip } from "@mui/material";
import Swal from "sweetalert2";

function Searchbox({ paginationdata, setpage, setskip }: searchBoxProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setopen] = useState<boolean>(false);
  const [searchString, setsearchString] = useState<string>("");
  const [openOptions, setopenOptions] = useState<boolean>(false);
  const [loader, setloader] = useState<boolean>(false);
  const [fromDate, setfromDate] = useState<string>("");
  const [toDate, settoDate] = useState<string>("");
  const [amount, setamount] = useState<string>("");

  const flag = useSelector((state: RootState) => state.membership.flag);

  const closeDialog = () => {
    setopen(false);
  };
  const closeOPtionsDialog = () => {
    setopenOptions(false);
  };

  const onsaveOptions = () => {
    setopen(true);
    setopenOptions(false);
  };

  const onsubmitmembership = async (userlist: ISearchUserModifiedObj[]) => {
    const usersmap: usersObj[] = userlist.map(
      (item: ISearchUserModifiedObj) => {
        return {
          userId: item._id,
          userName: initcapString(item.name),
          profilePictureURL: item.profilepictureurl,
        };
      }
    );
    const reqbody: CreateMembershipReqBody = {
      membershipId: "664266129f04623deb00110e",
      membershipName: "WFG Membership",
      validfrom: fromDate,
      validto: toDate,
      amount: amount,
      users: usersmap,
    };
    try {
      setloader(true);
      let response = await createMembershipRecords(reqbody);
      Swal.fire({
        icon: response.success ? "success" : "error",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchmembershipcards(paginationdata));
      setloader(false);
      setopen(false);
    } catch (error: any) {
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.message ? error.message : "Failed to create the record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const onSubmitSearch = () => {
    let reqbody: fetchMenbershipCardsReqBody = {
      searchString: searchString,
      flag: flag,
      skip: 0,
      limit: 10,
    };
    setpage(1);
    setskip(0);
    dispatch(fetchmembershipcards(reqbody));
    dispatch(resetMembershipData());
  };
  return (
    <div id="searchCards" className="flex items-center max-w-sm mx-auto gap-2">
      <div>
        <select
          id="position"
          value={flag}
          className="bg-gray-50 w-14 rounded-lg border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            dispatch(setFlag(e.target.value));
          }}
        >
          <option value="active">{"Active"}</option>
          <option value="inactive">{"Inactive"}</option>
        </select>
      </div>

      <div className="relative w-full">
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setsearchString(e.target.value);
          }}
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search a member by name..."
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onSubmitSearch();
        }}
        className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          //setopen(true);
          setopenOptions(true);
        }}
        className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {/* <AddIcon fontSize="5px" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="sr-only">Add</span>
      </button>
      <AdduserDialog
        open={open}
        submitloader={loader}
        dialogTitle={"Add Users"}
        onClose={closeDialog}
        onsave={onsubmitmembership}
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

export default Searchbox;
