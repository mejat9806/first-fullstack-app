import Post from "../PostComponent/PostArea";

const HomeUi = () => {
  return (
    <div className=" flex justify-center items-center w-full  md:ml-0 mt-20">
      <div className="w-[350px] sm:max-w-xl h-full ">
        <h1 className="text-4xl font-semibold">Home </h1>
        <Post />
      </div>
    </div>
  );
};

export default HomeUi;
