import { RootState, AppDispatch } from "../../../lib/store";
import { useState, useEffect, useRef } from "react";
import {
  fetchcurrentAirticleComments,
  fetchcurrentAirticleDetails,
  fetchPermissions,
  resetFlags,
} from "../../../lib/slices/airticle";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useAuth from "../../Common/customHooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { postComments } from "../service";
import Avatar from "@mui/material/Avatar";
import { IPostCommentReqBody } from "../domain";
import Errormessage from "../../Common/FormComponents/errormessage";
import CommentLineItem from "../../Common/CommentSection/comment";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "../../Common/Loader/pageLoader";
import { stringToColor } from "../../Common/functions";
import Likedislikesection from "./likedislikesection";

function NewsDescription({ newsId }: { newsId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const cmntRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const currentAirticleDetail = useSelector(
    (state: RootState) => state.airticle.currentAirticleDetail
  );
  const comments = useSelector((state: RootState) => state.airticle.comments);
  const [loader, setloader] = useState<boolean>(false);
  const AirticleLoader = useSelector(
    (state: RootState) => state.airticle.AirticleLoader
  );
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [isLoggedIn, token] = useAuth();

  useEffect(() => {
    if (newsId) {
      dispatch(fetchcurrentAirticleDetails(newsId));
      dispatch(fetchcurrentAirticleComments(newsId));
      dispatch(fetchPermissions(newsId));
    }
    return () => {
      dispatch(resetFlags());
    };
  }, []);
  const addpostComment = async (
    text: string,
    parentId?: string
  ): Promise<boolean> => {
    let requestObj: IPostCommentReqBody = {
      text: text,
      articleId: newsId,
    };
    if (parentId) {
      requestObj = {
        ...requestObj,
        parentId: parentId,
      };
    }
    try {
      setloader(true);
      let response = await postComments(requestObj);
      setloader(false);
      if (response.success) {
        if (cmntRef.current) cmntRef.current.value = "";
        dispatch(fetchcurrentAirticleComments(newsId));
      }
      return true;
    } catch (error) {
      setloader(false);
      return false;
    }
  };

  const getCommentsCount = () => {
    if (comments && comments.length > 0) {
      let count = 0;
      count += comments.length;
      comments.forEach((x) => {
        count += x.replyComments.length;
      });
      return count;
    } else {
      return 0;
    }
  };
  const fireReqloginDialog = () => {
    Swal.fire({
      title: "Please login to do like and comment",
      showCancelButton: true,
      confirmButtonText: "Go",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
        router.push("/login");
      }
    });
  };

  return (
    <>
      {AirticleLoader && <PageLoader />}
      <div>
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                  {currentAirticleDetail?.title}
                </h1>
                <address className="flex items-center mb-6 not-italic">
                  <div className="inline-flex items-center gap-3 mr-3 text-sm text-gray-900 dark:text-white">
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: currentAirticleDetail?.creator.fullName
                          ? stringToColor(
                              currentAirticleDetail?.creator.fullName.toString()
                            )
                          : "",
                      }}
                      src={
                        "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                        currentAirticleDetail?.creator.profilePictureURL
                      }
                    >
                      {currentAirticleDetail?.creator.fullName}
                    </Avatar>
                    <div>
                      <a
                        href="#"
                        rel="author"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {currentAirticleDetail?.creator.fullName}
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {currentAirticleDetail?.creator.about}
                      </p>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {currentAirticleDetail?.createdAt}
                      </p>
                    </div>
                  </div>
                </address>
              </header>
              <Likedislikesection
                newsId={newsId}
                fireReqloginDialog={fireReqloginDialog}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: currentAirticleDetail?.description || "",
                }}
              />

              <section className="not-format">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion ({getCommentsCount()})
                  </h2>
                </div>
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
                    {errorMessage && <Errormessage message={errorMessage} />}
                  </div>
                  <button
                    type="submit"
                    disabled={loader}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoggedIn) {
                        fireReqloginDialog();
                      } else if (cmntRef.current && cmntRef.current.value) {
                        seterrorMessage("");
                        addpostComment(cmntRef.current.value);
                      } else {
                        seterrorMessage("Please write something to comment");
                      }
                    }}
                    className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loader ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : (
                      "Post comment"
                    )}
                  </button>
                </form>
                {comments &&
                  comments.map((x, index) => (
                    <CommentLineItem
                      key={index}
                      commentData={x}
                      submitComment={addpostComment}
                      reqLoginDialogOpen={fireReqloginDialog}
                    />
                  ))}
              </section>
            </article>
          </div>
        </main>
      </div>
    </>
  );
}

export default NewsDescription;
