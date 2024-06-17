import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "../PostComponent/PostItem";
import { Button } from "@/shadcnComponent/ui/button";
import "./../../../../App.css";
import { UserContext } from "@/context/userContext";
import { IoAddCircleOutline } from "react-icons/io5";
import DialogFN from "../DialogFN";
import FileInputwithCrop from "../../addBannerImage/FileInputwithCrop";
import { CroppedArea, ImageCropper } from "../../ImageCropper";
import useUpdateUserData from "@/features/api/updateUser/updateUser/useUpdateUserData";

const ProfileUI = () => {
  const [openAddImage, setUpdateImage] = useState(false);
  const location = useLocation();
  const { updateUserFn } = useUpdateUserData();
  const [image, setImage] = useState("");
  const [imageAfterCrop, setImageAfterCrop] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const { id: userId } = useParams<{ id: string }>();
  const { user } = useContext(UserContext);
  if (!userId) {
    return <div>No user ID provided.</div>;
  }
  const onImageSelected = (selectedImage: string) => {
    setImage(selectedImage);
    setCurrentPage("crop-img");
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
  const onCropDone = (imgCroppedArea: CroppedArea) => {
    const canvasElement = document.createElement("canvas");
    const context = canvasElement.getContext("2d");
    const imageObj1 = new Image();
    imageObj1.src = image;

    imageObj1.onload = function () {
      const scaleX = imageObj1.width / imgCroppedArea.width;
      const scaleY = imageObj1.height / imgCroppedArea.height;
      canvasElement.width = imgCroppedArea.width;
      canvasElement.height = imgCroppedArea.height;

      if (context) {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x * scaleX,
          imgCroppedArea.y * scaleY,
          imgCroppedArea.width * scaleX,
          imgCroppedArea.height * scaleY,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height,
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

  return (
    <div className="w-full justify-center items-center flex mt-16">
      <div className="flex justify-center flex-col items-start md:w-[80%] w-full px-1 mt-3">
        <div className="w-full md:h-[300px] h-[200px] relative ">
          {userProfileData.bannerImage ? (
            <div className="w-full md:h-[300px] h-[200px] relative">
              <img
                src={`${baseUrl}img/posts/${userProfileData.bannerImage}`}
                alt=""
                className="h-full w-full object-center"
              />
              <button onClick={() => setUpdateImage(true)}>
                <IoAddCircleOutline
                  size={30}
                  className="absolute top-0 right-0 stroke-black"
                />
              </button>
            </div>
          ) : (
            <div className="h-full w-full">
              <button onClick={() => setUpdateImage(true)}>
                <IoAddCircleOutline
                  size={30}
                  className="absolute top-0 right-0 stroke-black"
                />
              </button>
            </div>
          )}
          <img
            src={`${baseUrl}img/posts/${userProfileData.profileImage}`}
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
            <p className="md:text-base text-sm">{userProfileData.email}</p>
            <span>X follower</span> <span>X following</span>
          </div>
          {userID === userProfileData.id && <Button>Edit profile</Button>}
        </div>
        <div className="flex gap-4">
          <Link
            to={"all"}
            className={`${
              location.pathname === `/profile/${userProfileData.id}/all`
                ? "toAdd"
                : ""
            }  w-22 p-3 relative `}
          >
            All <span className="">{userProfileData.posts.length}</span>
          </Link>
          <Link
            defaultChecked={true}
            to={"like"}
            className={`${
              location.pathname == `/profile/${userProfileData.id}/like`
                ? "toAdd"
                : ""
            }  w-22 p-3 relative `}
          >
            Like <span className="">{userProfileData.likePosts.length}</span>
          </Link>
          <Link
            to={"bookmarksave"}
            className={`${
              location.pathname ===
              `/profile/${userProfileData.id}/bookmarksave`
                ? "toAdd"
                : ""
            } w-22 p-3 relative `}
          >
            Bookmark
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
              <ImageCropper
                image={image}
                onCropDone={onCropDone}
                onCropCancel={onCropCancel}
              />
            ) : (
              <div className="w-full">
                <img src={imageAfterCrop} alt="Cropped" />
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
    </div>
  );
};

export default ProfileUI;
