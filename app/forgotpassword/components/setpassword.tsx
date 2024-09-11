import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import useAuth from "@/app/Common/customHooks/useAuth";
import Errormessage from "../../Common/FormComponents/errormessage";
import WFGLogo from "../../Common/logo";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { setPasswordSchema, ISetPasswordrequestBody } from "../domain";
import { useForm } from "react-hook-form";
import { checkOtpAndChangePassword } from "../service";
import SucessSections from "../../Common/Loader/sucessSections";
import CircularProgress from "@mui/material/CircularProgress";
import { yupResolver } from "@hookform/resolvers/yup";

function SetPassword({ tempId, email }: { tempId: string; email?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setPasswordSchema),
  });
  const router = useRouter();
  const [isLoggedIn, token] = useAuth();
  const [tokenExpired, settokenExpired] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (tempId) {
      let time = tempId.split("_")[1];
      if (time) {
        const now = new Date();

        const tenMinutesAgo = new Date(
          now.getTime() - 10 * 60 * 1000
        ).getTime();

        if (tenMinutesAgo > parseInt(time)) {
          settokenExpired(true);
        }
      }
    }
  }, []);

  const [loader, setloader] = useState<boolean>(false);
  const onSubmit = async (data: any) => {
    let obj: ISetPasswordrequestBody = {
      email: email || "",
      fotp: tempId.split("_")[0],
      newpassword: data.password,
    };
    try {
      setloader(true);
      let success: boolean = false;
      let response = await checkOtpAndChangePassword(obj);
      setloader(false);
      if (response.success) {
        success = true;
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
      Swal.fire({
        icon: !success ? "error" : "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error: any) {
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(obj);
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex gap-3 justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Reset Password
                </h1>
                <WFGLogo />
              </div>
              {!tokenExpired ? (
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      {...register("password")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors && errors.password && (
                      <Errormessage message={errors.password.message} />
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      placeholder="••••••••"
                      {...register("cpassword")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors && errors.cpassword && (
                      <Errormessage message={errors.cpassword.message} />
                    )}
                  </div>
                  {loader ? (
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
                      disabled={false}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  )}
                </form>
              ) : (
                <SucessSections message={"Token is expired"} success={false} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SetPassword;
