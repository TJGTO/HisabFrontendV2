"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import Errormessage from "../../Common/FormComponents/errormessage";
import { loginSchema } from "../domain";
import CircularProgress from "@mui/material/CircularProgress";
import { loginOfUser } from "../../../lib/slices/authorization";
import { RootState, AppDispatch } from "../../../lib/store";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const [submitted, setsubmitted] = useState<boolean>(false);
  const loginLoader = useSelector(
    (state: RootState) => state.authorization.loginLoader
  );
  const userDetail = useSelector(
    (state: RootState) => state.authorization.userDetail
  );
  const loginMessage = useSelector(
    (state: RootState) => state.authorization.loginMessage
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (submitted && !loginLoader && userDetail) {
      Swal.fire({
        icon: "success",
        title: loginMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setsubmitted(false);
      router.push("/dashboard");
    }
    if (submitted && !loginLoader && !userDetail) {
      Swal.fire({
        icon: "error",
        title: loginMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      setsubmitted(false);
    }
  }, [loginLoader, userDetail]);
  const onSubmit = (data: any) => {
    setsubmitted(true);
    dispatch(loginOfUser(data));
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex gap-3 justify-between">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
                </h1>
                <img
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  alt="logo"
                />
              </div>

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    {...register("email")}
                  />
                  {errors && errors.email && (
                    <Errormessage message={errors.email.message} />
                  )}
                </div>

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
                {loginLoader ? (
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
                    Login
                  </button>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don,t have an account?{" "}
                  <Link
                    href="/registration"
                    className="font-medium text-blue-700 hover:underline"
                  >
                    {" "}
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginForm;
