import { useState, useEffect, useDeferredValue } from "react";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import ChatIcon from "@mui/icons-material/Chat";
import useAuth from "../../Common/customHooks/useAuth";
import { updatelikedislikecount } from "../service";
import {
  IupdateLikeDislikeCountReqBody,
  likedislikeCompProps,
} from "../domain";
import AskQuestionDialog from "./askQuestionDialog";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { debounce } from "../../Common/functions";
import { setlikeordislike } from "../../../lib/slices/airticle";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function Likedislikesection({
  newsId,
  fireReqloginDialog,
}: likedislikeCompProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [flag, setflag] = useState<string>("");
  const [openAsk, setopenAsk] = useState<boolean>(false);
  const deferredFlag = useDeferredValue<string>(flag);
  const currentAirticleDetail = useSelector(
    (state: RootState) => state.airticle.currentAirticleDetail
  );
  const permissions = useSelector(
    (state: RootState) => state.airticle.permissions
  );
  const [isLoggedIn, token] = useAuth();
  useEffect(() => {
    if (permissions && permissions.liked) {
      setflag("like");
    }
    if (permissions && permissions.disliked) {
      setflag("dislike");
    }
  }, [permissions]);

  useEffect(() => {
    if (deferredFlag) {
      debouncedLikeorDislike(deferredFlag);
    }
  }, [deferredFlag]);

  const closeAskDialog = () => {
    setopenAsk(false);
  };
  const updatelikeordislike = async (flag: string) => {
    let requestObj: IupdateLikeDislikeCountReqBody = {
      flag: flag,
      articleId: newsId,
    };
    try {
      let response = await updatelikedislikecount(requestObj);
      if (response) {
        dispatch(
          setlikeordislike({
            likesCount: response.likeordislike.likesCount,
            dislikesCount: response.likeordislike.dislikesCount,
          })
        );
      }
    } catch (error) {}
  };
  const debouncedLikeorDislike = debounce(updatelikeordislike, 1000);
  const setlike = () => {
    if (!isLoggedIn) {
      fireReqloginDialog();
      return;
    }
    if (flag == "dislike" && currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount + 1,
          dislikesCount: currentAirticleDetail.dislikesCount - 1,
        })
      );
    } else if (currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount + 1,
          dislikesCount: currentAirticleDetail.dislikesCount,
        })
      );
    }
    setflag("like");
  };
  const outlike = () => {
    if (currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount - 1,
          dislikesCount: currentAirticleDetail.dislikesCount,
        })
      );
      setflag("");
      updatelikeordislike("outlike");
    }
  };
  const setdislike = () => {
    if (!isLoggedIn) {
      fireReqloginDialog();
      return;
    }
    if (flag == "like" && currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount - 1,
          dislikesCount: currentAirticleDetail.dislikesCount + 1,
        })
      );
    } else if (currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount,
          dislikesCount: currentAirticleDetail.dislikesCount + 1,
        })
      );
    }
    setflag("dislike");
  };
  const outdislike = () => {
    if (currentAirticleDetail) {
      dispatch(
        setlikeordislike({
          likesCount: currentAirticleDetail.likesCount,
          dislikesCount: currentAirticleDetail.dislikesCount - 1,
        })
      );
      setflag("");
      updatelikeordislike("outdislike");
    }
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-2 items-center">
      <div className="flex gap-4 mb-2">
        <Tooltip title="Like">
          <div
            onClick={(e) => {
              e.preventDefault();
              if (flag != "like") {
                setlike();
              } else {
                outlike();
              }
            }}
            className="flex gap-2"
          >
            {" "}
            <ThumbUpAltIcon
              className={`cursor-pointer ${
                flag == "like" ? "text-blue-500" : ""
              }`}
            />
            <div>{currentAirticleDetail?.likesCount}</div>
          </div>
        </Tooltip>
        <Tooltip title="Dislike">
          <div
            onClick={(e) => {
              e.preventDefault();
              if (flag != "dislike") {
                setdislike();
              } else {
                outdislike();
              }
            }}
            className="flex gap-2"
          >
            {" "}
            <ThumbDownIcon
              className={`cursor-pointer ${
                flag == "dislike" ? "text-blue-500" : ""
              }`}
            />
            <div>{currentAirticleDetail?.dislikesCount}</div>
          </div>
        </Tooltip>
        {permissions.editArticle && (
          <Tooltip title="Edit Article">
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push(`/news/edit/${newsId}`);
              }}
            >
              {" "}
              <EditIcon className="cursor-pointer" />
            </div>
          </Tooltip>
        )}
      </div>
      <div className="hidden sm:block"></div>
      <Tooltip title="Ask Question to article">
        <div>
          {" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                fireReqloginDialog();
              } else {
                setopenAsk(true);
              }
            }}
            className="w-full h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Chat with Article <ChatIcon />
          </button>
        </div>
      </Tooltip>

      <AskQuestionDialog
        open={openAsk}
        onClose={closeAskDialog}
        articleContent={currentAirticleDetail?.description || ""}
      />
    </div>
  );
}

export default Likedislikesection;
