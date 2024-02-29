import { NewsCardProps } from "../domain";
import Avatar from "@mui/material/Avatar";
import { maxtitleLength } from "../../news/domain";
import { stringToColor, createSortFromForAvator } from "../../Common/functions";
function NewsCard({
  _id,
  title,
  createdAt,
  updatedAt,
  createdBy,
  gotoPage,
  profilePictureURL,
}: NewsCardProps) {
  const truncatedTitle =
    title.length > maxtitleLength
      ? `${title.slice(0, maxtitleLength)}...`
      : title;
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img
            alt="Placeholder"
            className="block h-40 w-full"
            src={
              "https://wfgimagebucket.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2024-02-18+at+14.46.28.jpeg"
            }
          />
        </a>

        <header className="flex items-center justify-between dark:bg-slate-800 bg-white leading-tight p-2 md:pt-2 h-14 overflow-hidden">
          <h1 className="text-md">
            <p className="no-underline text-black dark:text-white">
              {truncatedTitle}
            </p>
          </h1>
        </header>

        <div className="flex justify-between w-full dark:bg-slate-800 bg-white leading-tight p-2 md:t-2">
          <a
            className="flex items-center no-underline hover:underline text-black dark:text-white"
            href="#"
          >
            <Avatar
              alt="Profile Picture"
              src={
                "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                profilePictureURL
              }
              sx={{
                bgcolor: createdBy ? stringToColor(createdBy.toString()) : "",
              }}
            >
              {createdBy && createSortFromForAvator(createdBy.toString())}
            </Avatar>
            <p className="ml-2 text-sm text-black dark:text-white">
              {createdBy}
            </p>
          </a>
          <p className="ml-1 text-sm text-black dark:text-white mt-2">
            {" "}
            {createdAt}
          </p>
        </div>
        <footer className="flex items-center justify-between dark:bg-slate-800 bg-white leading-none p-2 md:pt-2">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              gotoPage(`/news/${_id}`);
            }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View & Read
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

export default NewsCard;
