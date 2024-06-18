import { useTheme } from "@/components/darkMode/theme-provider";
import CreatePostInput from "./CreatePostInput";

const CreatePost = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <h1
        className={`md:text-5xl text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-black"
        } `}
      >
        Create New Post
      </h1>
      <CreatePostInput setIsOpen={setIsOpen} />
      {/* <UseCreatePostForm /> */}
    </div>
  );
};

export default CreatePost;
