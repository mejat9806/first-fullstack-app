import { useTheme } from "@/components/darkMode/theme-provider";
import CreatePostInput from "./CreatePostInput";
import React, { useState } from "react";

const CreatePost = () => {
  const [IsOpen, setIsOpen] = useState(false);
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
