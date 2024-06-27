import { useLocation, useParams } from "react-router-dom";
import PostItem from "../../PostComponent/PostItem";
import { Ilike, Iposts } from "@/utils/type";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../../LoadingPage";

const AllPostByUser = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (!userId) {
    return;
  }
  if (isGetProfile || !userProfileData) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }
  console.log(userProfileData.posts, "here");

  return (
    <div
      className={` flex   md:justify-center md:items-center mt-12 w-full rounded-full`}
    >
      <div className="w-full md:max-w-lg flex-col gap-10 flex">
        {userProfileData.posts.map((post) => (
          <PostItem
            key={post.id}
            item={{
              id: post.id,
              createAt: post.createAt,
              _id: post.id,
              title: post?.title,
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
