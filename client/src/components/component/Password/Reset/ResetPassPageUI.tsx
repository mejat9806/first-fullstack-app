import ResetPassForm from "./ResetPassForm";

const ResetPassPageUI = () => {
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
            <ResetPassForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassPageUI;
