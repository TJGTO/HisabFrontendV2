import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import useAuth from "@/app/Common/customHooks/useAuth";
import Errormessage from "../../Common/FormComponents/errormessage";
import WFGLogo from "../../Common/logo";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { forgotPasswordSchema, IForgotPasswordrequestBody } from "../domain";
import { useForm } from "react-hook-form";
import { updateFotp } from "../service";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import SucessSections from "../../Common/Loader/sucessSections";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const router = useRouter();
  const [isLoggedIn, token] = useAuth();
  const [optSuccessfull, setoptSuccessfull] = useState<boolean>(false);
  useEffect(() => {
    if (isLoggedIn) {
      redirect("/dashboard");
    }
  }, [isLoggedIn]);

  const [loader, setloader] = useState<boolean>(false);
  const onSubmit = async (data: any) => {
    let obj: IForgotPasswordrequestBody = {
      email: data.email,
    };
    try {
      setloader(true);
      let success: boolean = false;
      let response = await updateFotp(obj);
      setloader(false);
      if (response.success) {
        success = true;
        setoptSuccessfull(true);
        //router.push("/login");
      }
    } catch (error: any) {
      setloader(false);
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex gap-3 justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Fogot Password
                </h1>
                <WFGLogo />
              </div>
              {!optSuccessfull ? (
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input
                      id="email"
                      autoComplete="nope"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      {...register("email")}
                    />
                    {errors && errors.email && (
                      <Errormessage message={errors.email.message} />
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
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Go back to Login?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-blue-700 hover:underline"
                    >
                      {" "}
                      Click here
                    </Link>
                  </p>
                </form>
              ) : (
                <SucessSections
                  message="Check you email for the link"
                  success={true}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
