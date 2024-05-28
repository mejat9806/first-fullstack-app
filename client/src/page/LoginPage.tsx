import LoginUI from "@/components/loginUI/LoginUI";

function LoginPage() {
  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div className="md:grid md:grid-cols-2  rounded-lg  mx-3 w-full max-w-3xl ">
        <div>
          <img
            className="h-full bg-red-200 object-cover w-full rounded-l-2xl hidden md:flex"
            src="/img/sigin.webp"
          />
        </div>
        <LoginUI />
      </div>
    </div>
  );
}

export default LoginPage;
