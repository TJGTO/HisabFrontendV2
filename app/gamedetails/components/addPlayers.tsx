import React, { useRef, useState } from "react";
import { addPlayersDialogProps } from "../domain";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import { ISearchUserReqBody } from "../../profile/domain";
import { searchUsersProfiles } from "../../../lib/slices/profileSection";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

function AddPlayersDialog({ open, onClose }: addPlayersDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchUsers = useSelector(
    (state: RootState) => state.profileSection.searchUsers
  );
  console.log("searchUsers", searchUsers);
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <div className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Players
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="w-full">
            <form
              className="max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                if (inputRef.current && inputRef.current.value) {
                  let reqBody: ISearchUserReqBody = {};
                  reqBody.userName = inputRef.current.value;
                  dispatch(searchUsersProfiles(reqBody));
                }
              }}
            >
              <div className="flex">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  Your Email
                </label>

                <div className="relative w-full">
                  <input
                    type="search"
                    ref={inputRef}
                    id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search Players by name"
                  />
                  <button
                    type="submit"
                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                </div>
              </div>
            </form>
          </div>
          <div className="w-full">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4" key={"1"}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={
                        "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                        "Tathagata_Mondal_2024-02-18_17%3A41%3A58.480Z"
                      }
                      alt={"Tathagata"}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {"Tathagata"}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {"Hey BC"}
                    </p>
                  </div>
                  {
                    <div className="inline-flex cursor-pointer items-center text-base font-semibold text-gray-900 dark:text-white pl-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add <AddIcon className="h-4 w-4" />
                      </button>
                    </div>
                  }
                </div>
              </li>
              <li className="py-3 sm:py-4" key={"1"}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={
                        "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                        "Tathagata_Mondal_2024-02-18_17%3A41%3A58.480Z"
                      }
                      alt={"Tathagata"}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {"Tathagata"}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {"Hey BC"}
                    </p>
                  </div>
                  {
                    <div className="inline-flex cursor-pointer items-center text-base font-semibold text-gray-900 dark:text-white pl-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add <AddIcon className="h-4 w-4" />
                      </button>
                    </div>
                  }
                </div>
              </li>
            </ul>
          </div>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <span
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              Default
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
            <span
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              Default
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
            <span
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              Default
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
            <span
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              Default
              <button
                type="button"
                className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                data-dismiss-target="#badge-dismiss-default"
                aria-label="Remove"
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Remove badge</span>
              </button>
            </span>
          </div>
          <button
            //disabled={!checked}
            onClick={(e) => {
              //e.preventDefault(), dispatch(increment());
              // console.log("ieruh");
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddPlayersDialog;
