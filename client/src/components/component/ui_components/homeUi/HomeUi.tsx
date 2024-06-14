import SelectComponent from "../../SelectComponent";
import Post from "../PostComponent/PostArea";

const HomeUi = () => {
  return (
    <div className=" flex justify-center items-center w-full ml-8 md:ml-0 mt-20">
      <div className="w-fit h-full ">
        <h1 className="text-4xl font-semibold">Home </h1>
        <Post />
      </div>
    </div>
  );
};

export default HomeUi;
