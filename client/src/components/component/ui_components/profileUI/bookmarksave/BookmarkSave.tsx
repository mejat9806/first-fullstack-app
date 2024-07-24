import { useParams } from "react-router-dom";

import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../../LoadingPage";
import PostItem from "../../PostComponent/PostItem";

const BookmarkSave = () => {
  // const { state } = useLocation();

  // const data = state;

  const { id: userId } = useParams<{ id: string }>();

  const { userProfileData } = useGetPosterProfile({
    userId,
  });
  if (!userProfileData) {
    return <LoadingPage className="" />;
  }

  return (
    <div
      className={` flex   md:justify-center md:items-center mt-12 w-full rounded-full`}
    >
      <div className="w-full md:max-w-lg flex-col gap-10 flex">
        {userProfileData.bookmark.map((bookmark) => (
          <PostItem
            key={bookmark.post.id}
            item={{
              id: bookmark.post.id,
              createAt: bookmark.post.createAt,
              _id: bookmark.post.id,
              title: bookmark.post.title,
              detail: bookmark.post.detail,
              slug: bookmark.post.slug,
              image: bookmark.post.image,
              likesCount: bookmark.post.likesCount,
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

export default BookmarkSave;
