import React, { useState, useRef } from "react";
import { Avatar } from "@mui/material";
import { CommentProps } from "./domain";
import CircularProgress from "@mui/material/CircularProgress";

const CommentLineItem: React.FC<CommentProps> = ({
  commentData,
  submitComment,
  reqLoginDialogOpen,
}) => {
  const [openReplyInptBox, setopenReplyInptBox] = useState<boolean>(false);
  const [openReplySection, setopenReplySection] = useState<boolean>(false);
  const cmntRef = useRef<HTMLTextAreaElement>(null);
  const [loader, setloader] = useState<boolean>(false);
  const submitReplyComment = async () => {
    if (cmntRef.current && cmntRef.current.value) {
      setloader(true);
      try {
        let response = await submitComment(
          cmntRef.current.value,
          commentData.commentId
        );
        setloader(false);
        if (response) {
          cmntRef.current.value = "";
          setopenReplyInptBox(false);
        }
      } catch (error) {
        setloader(false);
      }
    }
  };
  return (
    <>
      <article className="p-3 mb-3 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Avatar
                src={
                  "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                  commentData.commentBy.profilePictureURL
                }
                alt={commentData.commentBy.fullName}
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {commentData.commentBy.fullName}
              </p>
            </div>
          </div>
        </footer>
        <p>{commentData.text}</p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setopenReplyInptBox(true);
            }}
            className="flex items-center font-medium text-sm text-gray-500 hover:underline cursor-pointer dark:text-gray-400"
          >
            <svg
              className="mr-1.5 w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
            </svg>
            Reply
          </button>
          {commentData.replyComments.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setopenReplySection(!openReplySection);
              }}
              className="flex items-center font-medium text-sm text-gray-500 hover:underline cursor-pointer dark:text-gray-400"
            >
              {openReplySection ? "Close" : "Expand"}
            </button>
          )}

          {commentData.replyComments.length > 0 && (
            <span>{commentData.replyComments.length} replies</span>
          )}
        </div>
      </article>
      <article className="p-3 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        {openReplyInptBox && (
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label className="sr-only">Your comment</label>
              <textarea
                id="comment"
                ref={cmntRef}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loader}
                onClick={async (e) => {
                  e.preventDefault();
                  submitReplyComment();
                }}
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loader ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  "Post reply"
                )}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setopenReplyInptBox(false);
                }}
                className="inline-flex items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {openReplySection &&
          commentData.replyComments.map((x, index) => (
            <div className="mb-6" key={index}>
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Avatar
                      src={
                        "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                        x.commentBy.profilePictureURL
                      }
                      alt={x.commentBy.fullName}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {x.commentBy.fullName}
                    </p>
                  </div>
                </div>
              </footer>
              <p>{x.text}</p>
            </div>
          ))}
      </article>
    </>
  );
};

export default CommentLineItem;
