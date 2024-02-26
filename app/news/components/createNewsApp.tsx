"use client";

import TextEditor from "../../Common/FormComponents/TextEditor";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createTheNews,
  resetFlags,
  fetchcurrentAirticleDetails,
} from "../../../lib/slices/airticle";
import { hasStringContent } from "../../Common/functions";
import Errormessage from "../../Common/FormComponents/errormessage";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createNewsReqBody, ICreateEditArticleProps } from "../domain";

const CreateNewsAPP: React.FC<ICreateEditArticleProps> = ({ newsId, mode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [title, settitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [titleError, settitleError] = useState<boolean>(false);
  const [contentError, setcontentError] = useState<boolean>(false);
  const AirticleLoader = useSelector(
    (state: RootState) => state.airticle.AirticleLoader
  );
  const AirticleMessage = useSelector(
    (state: RootState) => state.airticle.AirticleMessage
  );
  const AirticleFlag = useSelector(
    (state: RootState) => state.airticle.AirticleFlag
  );
  const currentAirticleDetail = useSelector(
    (state: RootState) => state.airticle.currentAirticleDetail
  );
  useEffect(() => {
    if (newsId) {
      dispatch(fetchcurrentAirticleDetails(newsId));
    }
    return () => {
      dispatch(resetFlags());
    };
  }, []);
  useEffect(() => {
    if (newsId && mode == "edit") {
      settitle(currentAirticleDetail?.title || "");
      setContent(currentAirticleDetail?.description || "");
    }
  }, [currentAirticleDetail]);
  useEffect(() => {
    if (!AirticleLoader && AirticleMessage) {
      Swal.fire({
        icon: AirticleFlag == "error" ? "error" : "success",
        title: AirticleMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(resetFlags());
        if (mode == "edit") {
          router.push(`/news/${newsId}`);
        } else {
          router.push("/dashboard");
        }
      }, 1600);
    }
    return () => {
      dispatch(resetFlags());
    };
  }, [AirticleLoader, AirticleMessage]);
  const onSubmitForm = () => {
    if (!title) {
      settitleError(true);
      return;
    } else {
      settitleError(false);
    }
    if (!hasStringContent(content)) {
      setcontentError(true);
      return;
    } else {
      settitleError(false);
    }

    let requestObj: createNewsReqBody = {
      title: title,
      description: content,
    };
    if (mode == "edit") {
      requestObj.articleId = newsId;
      requestObj.createdBy = currentAirticleDetail?.creator._id;
    }
    dispatch(createTheNews(requestObj));
  };
  return (
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl mt-5 mb-5">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitForm();
          }}
        >
          <div className="mb-2">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              value={title}
              required
              onChange={(e) => {
                e.preventDefault();
                settitle(e.target.value);
              }}
            />
            {titleError && <Errormessage message={"Please enter a title"} />}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <TextEditor content={content} setContent={setContent} />
            {contentError && (
              <Errormessage message={"Please enter the description"} />
            )}
          </div>
          <div>
            {AirticleLoader ? (
              <button
                type="submit"
                disabled={true}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CircularProgress color="secondary" size={20} />
              </button>
            ) : (
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmitForm();
                }}
                disabled={false}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            )}
          </div>
        </form>{" "}
      </article>
    </div>
  );
};

export default CreateNewsAPP;
