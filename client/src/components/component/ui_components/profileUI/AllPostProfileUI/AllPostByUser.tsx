import { useParams } from "react-router-dom";
import PostItem from "../../PostComponent/PostItem";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../../LoadingPage";

const AllPostByUser = () => {
  const { id: userId } = useParams<{ id: string }>();
  const { userProfileData } = useGetPosterProfile({
    userId,
  });
  if (!userId) {
    return;
  }
  if (!userProfileData) {
    return <LoadingPage className="h-fit" />;
  }

  console.log(userProfileData?.posts, "here");

  return (
    <div
      className={` flex   md:justify-center md:items-center mt-12 w-full rounded-full`}
    >
      <div className="w-full md:max-w-lg flex-col gap-10 flex">
        {userProfileData?.posts.map((post) => (
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
