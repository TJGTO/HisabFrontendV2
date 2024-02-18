"use client";

import { CardObject } from "../domain";
import Avatar from "@mui/material/Avatar";
import { stringToColor, createSortFromForAvator } from "../../Common/functions";

function Card({
  cardId,
  URL,
  venue,
  date,
  creator,
  startTime,
  endTime,
  price,
  status,
  gotoPage,
}: CardObject) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img alt="Placeholder" className="block h-40 w-full" src={URL} />
        </a>

        <header className="flex items-center justify-between dark:bg-slate-800 bg-white leading-tight p-2 md:pt-2">
          <h1 className="text-lg">
            <a
              className="no-underline hover:underline text-black dark:text-white"
              href="#"
            >
              {venue}
            </a>
          </h1>
          <p className="text-black dark:text-white text-sm">{date}</p>
        </header>
        <div className="flex justify-between w-full dark:bg-slate-800 bg-white leading-tight p-2 md:t-2">
          <p className="ml-1 text-sm text-black dark:text-white">
            {startTime} - {endTime}
          </p>
          <p className="ml-1 text-sm text-black dark:text-white">₹ {price}</p>
        </div>
        <div className="flex justify-between w-full dark:bg-slate-800 bg-white leading-tight p-2 md:t-2">
          <a
            className="flex items-center no-underline hover:underline text-black dark:text-white"
            href="#"
          >
            <Avatar
              alt="Profile Picture"
              src={
                "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                creator.profilePictureURL
              }
              sx={{
                bgcolor: creator.firstName
                  ? stringToColor(creator.firstName.toString())
                  : "",
              }}
            >
              {creator.firstName &&
                createSortFromForAvator(creator.firstName.toString())}
            </Avatar>
            <p className="ml-2 text-sm text-black dark:text-white">
              {creator.firstName + " " + creator.lastName}
            </p>
          </a>
          <p className="ml-1 text-sm text-black dark:text-white mt-2">
            {" "}
            {status}
          </p>
        </div>
        <footer className="flex items-center justify-between dark:bg-slate-800 bg-white leading-none p-2 md:pt-2">
          <button
            type="submit"
            //disabled={!checked}
            onClick={(e) => {
              e.preventDefault();
              gotoPage(`/news/${cardId}`);
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status == "Active" ? "View & Register" : "View"}
          </button>
          <a
            className="no-underline text-grey-darker hover:text-red-dark"
            href="#"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a>
        </footer>
      </article>
    </div>
  );
}

export default Card;
