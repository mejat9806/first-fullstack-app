import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import { useParams } from "react-router-dom";
import LoadingPage from "../../LoadingPage";
import PostItem from "../../PostComponent/PostItem";

const AllPostByUser = () => {
  const { id: userId } = useParams<{ id: string }>();
  if (!userId) {
    return <div>No user ID provided.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile || !userProfileData) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }
  console.log(userProfileData, "allData");
  return (
    <div className=" flex   justify-center items-center mt-12 overflow-hidden">
      <div className="md:w-[40%] flex flex-col gap-5">
        {userProfileData.posts.map((post) => (
          <PostItem
            key={post.id}
            item={{
              createAt: post.createAt,
              _id: post.id,
              title: post.title,
              detail: post.detail,
              slug: post.slug,
              image: post.image,
              likesCount: post.likesCount,
              likes: userProfileData.likePosts,
              author: {
                name: userProfileData.name,
                _id: userProfileData.id,
                profileImage: userProfileData.profileImage,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPostByUser;