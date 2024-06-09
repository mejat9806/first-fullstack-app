import SelectComponent from "../../SelectComponent";
import Post from "../PostComponent/PostArea";

const HomeUi = () => {
  return (
    <div className=" flex justify-center items-center ">
      <div className="w-fit h-full mt-12">
        <h1 className="text-4xl font-semibold">Home </h1>
        <Post />
      </div>
    </div>
  );
};

export default HomeUi;
