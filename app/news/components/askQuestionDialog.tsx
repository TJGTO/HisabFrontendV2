import React, { useEffect, useRef, useState, useTransition } from "react";
import { asktheArticleDialog } from "../domain";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../../lib/store";
import { useSelector } from "react-redux";
import { stripHtmlTags } from "../../Common/functions";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Swal from "sweetalert2";

function AskQuestionDialog({
  open,
  onClose,
  articleContent,
}: asktheArticleDialog) {
  const [isPending, setisPending] = useState<boolean>(false);
  const questionRef = useRef<HTMLInputElement>(null);
  const [gptResponse, setgptResponse] = useState<string>("");

  let stringContent = "";
  if (articleContent) {
    stringContent = stripHtmlTags(articleContent);
  }
  const handleClose = () => {
    onClose();
    setgptResponse("");
    if (questionRef.current && questionRef.current.value) {
      questionRef.current.value = "";
    }
  };

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  const submittheQuestion = async () => {
    if (questionRef.current && questionRef.current.value) {
      const question = questionRef.current.value;
      setisPending(true);
      await askGPT(question);
    }
  };

  const askGPT = async (question: string) => {
    try {
      let limiter = localStorage.getItem("gptlimiter");
      let time = new Date();
      if (limiter) {
        let count = parseInt(limiter.split("_")[0]);
        let timesetby = parseInt(limiter.split("_")[1]);
        let diff = time.getTime() - timesetby;
        if (count == 5 && diff < 86400000) {
          setgptResponse("You have reached your daily limit of 5 questions.");
          setisPending(false);
          return;
        } else if (diff > 86400000) {
          count = 0;
        }

        let setlimiterm = count + 1 + "_" + time.getTime();
        localStorage.setItem("gptlimiter", setlimiterm);
      } else {
        let setlimiterm = 1 + "_" + time.getTime();
        localStorage.setItem("gptlimiter", setlimiterm);
      }

      const response = await axios.post(
        "https://testing.wfgkolgpt.workers.dev/askthearticle",
        {
          article: stringContent,
          message: question,
        }
      );
      setgptResponse(response.data);
      setisPending(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setisPending(false);
      //setError("Failed to post data");
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
      <div className="w-full bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ask GPT
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Question
            </label>
            <div className="flex gap-1">
              {" "}
              {/* Adjusted gap to 1 between input and button */}
              <div className="flex-1">
                <input
                  id="question"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={false}
                  ref={questionRef}
                  placeholder="ask your questions here"
                />
              </div>
              <div className="flex-none">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    submittheQuestion();
                  }}
                  disabled={isPending}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Generating..." : "Ask"}
                </button>
              </div>
            </div>

            {/* Response section */}
            {gptResponse && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800 text-white w-full">
                {" "}
                {/* Adjusted margin */}
                <h2 className="font-bold">GPT Says : </h2>
                <p className="whitespace-pre-wrap">{gptResponse}</p>{" "}
                {/* This will preserve formatting */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AskQuestionDialog;
