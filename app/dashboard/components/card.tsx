"use client";

import { CardObject, Creator } from "../domain";

function Card({ cardId, URL, venue, date, creator }: CardObject) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img alt="Placeholder" className="block h-auto w-full" src={URL} />
        </a>

        <header className="flex items-center justify-between dark:bg-slate-800 bg-white leading-tight p-2 md:p-4">
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

        <footer className="flex items-center justify-between dark:bg-slate-800 bg-white leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-black dark:text-white"
            href="#"
          >
            <img
              alt="Placeholder"
              className="block rounded-full"
              src={creator.profileImageURL}
            />
            <p className="ml-2 text-sm text-black dark:text-white">
              {creator.firstName}
            </p>
          </a>
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
