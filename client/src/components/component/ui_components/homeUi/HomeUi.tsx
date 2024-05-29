import SelectComponent from "../../SelectComponent";
import Post from "../PostComponent/PostArea";

const HomeUi = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-fit">
        <SelectComponent />
        <Post type="normal" />
      </div>
    </div>
  );
};

export default HomeUi;
