import { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "@/lib/basedURL";
import { Button } from "@/shadcnComponent/ui/button";
import "./../../../../App.css";
import { UserContext } from "@/context/userContext";
import { IoAddCircleOutline } from "react-icons/io5";
import DialogFN from "../DialogFN";
import FileInputwithCrop from "../../addBannerImage/FileInputwithCrop";
import { CroppedArea, ImageCropper } from "../ImageCropper";
import useUpdateUserData from "@/features/api/updateUser/updateUser/useUpdateUserData";
import EditProfile from "../../edit profile/EditProfile";
import { Ifollow } from "@/utils/type";
import { useToggleFollow } from "@/features/api/follow/useToggleFollow";

const ProfileUI = () => {
  const [openAddImage, setUpdateImage] = useState(false);
  const location = useLocation();
  const { updateUserFn } = useUpdateUserData();
  const [image, setImage] = useState("");
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [imageAfterCrop, setImageAfterCrop] = useState("");
  const { ToggleFollow, isToggleFollow } = useToggleFollow();
  const [currentPage, setCurrentPage] = useState("choose-img");
  const { id: userId } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId: userId || "",
  });
  if (!userId) {
    return <div>No user ID provided.</div>;
  }
  if (!user) {
    return;
  }

  const onImageSelected = (selectedImage: string) => {
    setImage(selectedImage);
    setCurrentPage("crop-img");
  };

  const onCropDone = (imgCroppedArea: CroppedArea) => {
    const canvasElement = document.createElement("canvas");
    const context = canvasElement.getContext("2d");
    const imageObj1 = new Image();
    imageObj1.src = image;

    imageObj1.onload = function () {
      const scaleX = imageObj1.width / 100;
      const scaleY = imageObj1.height / 100;
      canvasElement.width = imgCroppedArea.width * scaleX;
      canvasElement.height = imgCroppedArea.height * scaleY;

      if (context) {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x * scaleX,
          imgCroppedArea.y * scaleY,
          imgCroppedArea.width * scaleX,
          imgCroppedArea.height * scaleY,
          0,
          0,
          imgCroppedArea.width * scaleX,
          imgCroppedArea.height * scaleY,
        );

        const dataUrl = canvasElement.toDataURL("image/jpeg");
        setImageAfterCrop(dataUrl);
        setCurrentPage("image-cropped");

        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const formData = new FormData();
            formData.append("bannerImage", blob, "croppedImage.jpg");
            updateUserFn(formData);
          });
      }
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  if (isGetProfile || !user) {
    return <LoadingPage />;
  }

  const userID = user.id;

  if (isError) {
    return <div>Error loading user profile: {isError.message}</div>;
  }

  if (!userProfileData) {
    return <div>No user profile data provided.</div>;
  }
  console.log({ userProfileData });
  const shouldRenderButton = userProfileData.id === user._id;
  const following = userProfileData.followers.map(
    (follow: Ifollow) => follow.user.id,
  );
  console.log(following, "following");
  const isFollow = following.includes(user.id);
  console.log(following, "isFOllow");
  const togglingFollow = () => {
    ToggleFollow(userProfileData.id);
  };
  const profileImage = `${
    userProfileData.profileImage ?? //return leftside if it not null/undefiend .if null/undifined it will return the right
    "./../../../../../public/img/userImage/defaultUser.svg"
  }`;
  console.log(userProfileData, "banner check");
  return (
    <div className="w-svw justify-center items-center flex ">
      <div className="flex justify-center flex-col items-start md:w-[50%] w-full px-1 mt-3 ">
        <div className="w-full md:h-[300px] h-[200px] relative ">
          {userProfileData.bannerImage ? (
            <div className="w-full md:h-[300px] h-[200px] relative bg-black">
              <img
                src={userProfileData.bannerImage}
                alt=""
                className="h-full w-full "
              />

              {shouldRenderButton && (
                <button onClick={() => setUpdateImage(true)}>
                  <IoAddCircleOutline
                    size={30}
                    className={`absolute top-0 right-0 stroke-white/10  hover:stroke-white`}
                  />
                </button>
              )}
            </div>
          ) : (
            <div className="w-full md:h-[300px] h-[200px] relative bg-black">
              {shouldRenderButton && (
                <button onClick={() => setUpdateImage(true)}>
                  <IoAddCircleOutline
                    size={30}
                    className="absolute top-0 right-0 stroke-white"
                  />
                </button>
              )}
            </div>
          )}
          <img
            src={profileImage}
            alt={`${userProfileData.name}'s profile`}
            className="h-32 absolute w-32   -bottom-10 left-3 rounded-full"
          />
        </div>
        <div className="w-full flex justify-end mt-10"></div>
        <div className=" flex justify-between w-full">
          <div className="">
            <h1 className="md:text-lg text-sm  font-Poppins">
              {userProfileData.name}
            </h1>
            <p>{userProfileData.bio}</p>
            <p className="md:text-base text-sm">{userProfileData.email}</p>
            <span>{userProfileData.followerCount} follower</span>{" "}
            <span>{userProfileData.followCount} following</span>
          </div>
          {userID === userProfileData.id ? (
            <Button onClick={() => setOpenEditProfile(true)}>
              Edit profile
            </Button>
          ) : (
            <Button disabled={isToggleFollow} onClick={togglingFollow}>
              {isFollow ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div className="flex gap-4">
          <Link
            to="all"
            state={userProfileData}
            className={`${
              location.pathname === `/profile/${userProfileData.id}/all`
                ? "toAdd"
                : ""
            }  w-22 p-3 relative `}
          >
            All <span className="">{userProfileData.posts.length}</span>
          </Link>
          <Link
            to="like"
            state={userProfileData}
            className={`${
              location.pathname == `/profile/${userProfileData.id}/like`
                ? "toAdd"
                : ""
            }  w-22 p-3 relative `}
          >
            Like <span className="">{userProfileData.likePosts.length}</span>
          </Link>
          <Link
            to="bookmarksave"
            state={userProfileData}
            className={`${
              location.pathname ===
              `/profile/${userProfileData.id}/bookmarksave`
                ? "toAdd"
                : ""
            } w-22 p-3 relative `}
          >
            Bookmark
            <span className="ml-1">{userProfileData.bookmark.length}</span>
          </Link>
        </div>
        <DialogFN
          type="component"
          setIsOpen={setUpdateImage}
          open={openAddImage}
          currentPage={currentPage}
          component={
            currentPage === "choose-img" ? (
              <FileInputwithCrop onImageSelected={onImageSelected} />
            ) : currentPage === "crop-img" ? (
              <div className=" relative w-full h-full">
                <ImageCropper
                  image={image}
                  onCropDone={onCropDone}
                  onCropCancel={onCropCancel}
                />
              </div>
            ) : (
              <div className="w-full">
                <img src={imageAfterCrop} alt="Cropped" className="w-full" />
                <div className="w-full h-full flex justify-center items-center gap-10 mt-5">
                  <Button
                    onClick={() => {
                      setCurrentPage("choose-img");
                      setImage("");
                      setUpdateImage(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )
          }
        />
      </div>
      <DialogFN
        type="component"
        setIsOpen={setOpenEditProfile}
        open={openEditProfile}
        component={
          <EditProfile
            userData={userProfileData}
            setIsOpen={setOpenEditProfile}
          />
        }
      />
    </div>
  );
};

export default ProfileUI;
