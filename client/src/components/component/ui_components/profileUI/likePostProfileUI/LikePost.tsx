import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import { useParams } from "react-router-dom";
import LoadingPage from "../../LoadingPage";
import PostItem from "../../PostComponent/PostItem";

const LikePost = () => {
  const { id: userId } = useParams<{ id: string }>();
  if (!userId) {
    return <div>No user ID provided.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userProfileData } = useGetPosterProfile({
    userId,
  });
  if (!userProfileData?.likePosts) {
    return <LoadingPage className="h-fit" />;
  }

  return (
    <div className=" flex flex-col gap-10  md:justify-center md:items-center mt-12 w-full overflow-hidden">
      <div className="w-full md:max-w-lg flex-col gap-10 flex">
        {userProfileData.likePosts.map((likePosts) => (
          <div key={likePosts._id}>
            <PostItem
              item={{
                id: likePosts.post.id,
                createAt: likePosts.post.createAt,
                _id: likePosts.post.id,
                title: likePosts.post.title,
                detail: likePosts.post.detail,
                slug: likePosts.post.slug,
                image: likePosts.post.image,
                likesCount: likePosts.post.likesCount,
                likes: userProfileData.likePosts,
                author: {
                  name: userProfileData.name,
                  _id: userProfileData._id,
                  profileImage: userProfileData.profileImage,
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LikePost;
