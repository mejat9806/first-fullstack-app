import Register from "@/components/component/Register";

function RegisterPage() {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen "
      // style={{
      //   backgroundImage: `url(https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      // }}
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="grid md:grid-cols-2  sm:p-10 justify-center  items-center max-w-4xl  ">
        <img
          src={
            "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="signin image"
          className=" h-full object-cover w-full rounded-s-2xl hidden md:flex"
        />
        <div className="w-full   transition-all duration-150 ">
          <div className="">
            {/* <div
            className=""
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <img src={backgroundImage} alt="register photo" className="" />
            <h1 className="">register</h1>
          </div> */}
            <div className="bg-slate-200/60 p-10 shadow-2xl w-full backdrop-blur-md rounded-e-2xl">
              <h1 className="text-4xl font-bold mb-6 text-black">
                <span className="">S</span>ign Up Here
              </h1>
              <div className="transition-all duration-150"></div>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
