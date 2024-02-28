import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import useAuth from "@/app/Common/customHooks/useAuth";
import Errormessage from "../../Common/FormComponents/errormessage";
import WFGLogo from "../../Common/logo";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { resetPasswordSchema, IChangePasswordrequestBody } from "../domain";
import { useForm } from "react-hook-form";
import { changePassword } from "../service";
import CircularProgress from "@mui/material/CircularProgress";
import { yupResolver } from "@hookform/resolvers/yup";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const [isLoggedIn, token] = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      redirect("/dashboard");
    }
  }, [isLoggedIn]);

  const [loader, setloader] = useState<boolean>(false);
  const onSubmit = async (data: any) => {
    let obj: IChangePasswordrequestBody = {
      email: data.email,
      oldpassword: data.oldpassword,
      newpassword: data.password,
    };
    try {
      setloader(true);
      let success: boolean = false;
      let response = await changePassword(obj);
      setloader(false);
      if (response.success) {
        success = true;
        router.push("/login");
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Old Password
                  </label>
                  <input
                    id="oldpassword"
                    autoComplete="nope"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("oldpassword")}
                  />
                  {errors && errors.oldpassword && (
                    <Errormessage message={errors.oldpassword.message} />
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="cpassword"
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
