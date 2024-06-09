import React, { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import LoadingPage from "../LoadingPage";
import { baseUrl } from "../PostComponent/PostItem";
import { Button } from "@/shadcnComponent/ui/button";
import "./../../../../App.css";
import { UserContext } from "@/context/userContext";
import { IoAddCircle, IoAddCircleOutline } from "react-icons/io5";
import DialogFN from "../DialogFN";
import AddBannerImage from "../../addBannerImage/AddBannerImage";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCropDone = (imgCroppedArea: any) => {
    //next we create a new canvas to preview the image
    const canvasElement = document.createElement("canvas");
    canvasElement.width = imgCroppedArea.width; //this will get the width of the canvas from the image croped
    canvasElement.height = imgCroppedArea.height; //this will get the height of the canvas from the image croped
    const context = canvasElement.getContext("2d"); //we use 2d context
    const imageObj1 = new Image(); //this will create a new image instance simillar to document.createElement('img').
    imageObj1.src = image; //this will set the image src to image
    imageObj1.onload = function () {
      // this will run on browser load
      context?.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height,
      );
      const dataUrl = canvasElement.toDataURL("image/jpeg"); //this is use to convert canvas data to image data
      setImageAfterCrop(dataUrl);
      setCurrentPage("image-cropped");
      fetch(dataUrl) //use fetch function because when given dataUrl it will be treated as fetchable source
        .then((res) => res.blob()) //then convert to blob object // blob object use to manipulate immutable raw data // in this example we convert dataUrl to img/jpeg
        .then((blob) => {
          const formData = new FormData();
          formData.append("bannerImage", blob, "croppedImage.jpg");
          updateUserFn(formData);
        });
    };
  };
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, isError, userProfileData } = useGetPosterProfile({
    userId,
  });
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
    <div className="flex justify-center flex-col items-start w-full gap-3">
      <div className="w-full md:h-[300px] h-[200px] relative">
        {userProfileData.bannerImage ? (
          <div className="w-full md:h-[300px] h-[200px] relative">
            <img
              src={`${baseUrl}img/posts/${userProfileData.bannerImage}`}
              alt=""
              className="h-full w-full object-center"
            />
            <button onClick={() => setUpdateImage(true)}>
              {" "}
              <IoAddCircleOutline
                size={30}
                className="absolute top-0 right-0 stroke-black"
              />
            </button>
          </div>
        ) : (
          <div className="h-full w-full">
            <button onClick={() => setUpdateImage(true)}>
              {" "}
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
          className="h-32 w-32 absolute -bottom-16 left-4 rounded-full"
        />
      </div>

      <div className="w-full flex justify-end mt-10"></div>
      <div className="mt-4 flex justify-between w-full">
        <div className="">
          <h1 className="text-3xl font-Poppins">{userProfileData.name}</h1>
          <p>{userProfileData.email}</p>
          <span>X follower</span> <span>X following</span>
        </div>
        {userID === userProfileData.id && <Button>Edit profile</Button>}
      </div>
      <div className="flex gap-4">
        {/* <Button onClick={() => navigate("all")}>All</Button>
          <Button onClick={() => navigate("like")}>Like Post</Button>
          <Button onClick={() => navigate("bookmarksave")}>Bookmark</Button> */}
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
            location.pathname === `/profile/${userProfileData.id}/bookmarksave`
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
            <div className=" w-full">
              <img src={imageAfterCrop} />
              <div className="w-full h-full flex justify-center items-center gap-10 mt-5">
                {" "}
                <Button
                  onClick={() => {
                    setCurrentPage("choose-img"), setImage("");
                    setUpdateImage(false);
                  }}
                >
                  close
                </Button>
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default ProfileUI;
