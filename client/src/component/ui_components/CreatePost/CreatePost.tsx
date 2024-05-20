import CreatePostInput from "./CreatePostInput";
import UseCreatePostForm from "./UseCreatePostForm";

const CreatePost = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold">Create New Post</h1>
      <CreatePostInput />
      {/* <UseCreatePostForm /> */}
    </div>
  );
};

export default CreatePost;
