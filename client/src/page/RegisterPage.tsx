import Register from "@/component/Register";

function RegisterPage() {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen bg-blue-200 "
      // style={{
      //   backgroundImage: `url(https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      // }}
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex sm:p-10 justify-center items-center">
        <img
          src={
            "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="signin image"
          className="h-[700px] w-[00px]  sm:w-[300px] md:w-[400px] transition-all duration-150 "
        />
        <div className="w-full  sm:w-[500px] md:w-[600px]  transition-all duration-150 ">
          <div className="">
            {/* <div
            className=""
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <img src={backgroundImage} alt="register photo" className="" />
            <h1 className="">register</h1>
          </div> */}
            <div className="bg-slate-400/60 p-10 shadow-2xl w-full backdrop-blur-md sm:h-[700px]">
              <h1 className="text-4xl font-bold mb-6 text-white">
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
