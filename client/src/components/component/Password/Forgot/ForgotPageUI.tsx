import ForgotPassForm from "./ForgotPassForm";

const ForgotPageUI = () => {
  return (
    <div className="flex justify-center items-center w-screen h-svh">
      <div className="md:grid md:grid-cols-2 shadow-2xl rounded-lg bg-slate-50 h-1/2 mx-3">
        <div className="hidden md:flex bg-red-700 "></div>
        <div className="m-7">
          <h1 className="text-2xl text-center font-extrabold">
            Forgot Password?
          </h1>
          <p className="text-center text-sm">
            Just input your email and we will work it out😉
          </p>
          <div>
            <ForgotPassForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPageUI;
