import { useTheme } from "@/components/darkMode/theme-provider";
import CreatePostInput from "./CreatePostInput";

const CreatePost = () => {
  const { theme } = useTheme();
  return (
    <div>
      <h1
        className={`text-5xl font-bold ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Create New Post
      </h1>
      <CreatePostInput />
      {/* <UseCreatePostForm /> */}
    </div>
  );
};

export default CreatePost;
