import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcnComponent/ui/carousel";
import TextArea from "../homeUi/TextArea";
import PostFooter from "./PostFooter";

interface PostItemType {
  image?: string;
}

const PostItem = ({ image }: PostItemType) => {
  return (
    <div className="p-2 bg-slate-200/30 rounded-2xl py-7">
      <div className="w-full h-  flex gap-1 mb-3">
        <img src="/defaultUser.svg" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col items-start justify-start ">
          <h1 className="text-lg font-semibold leading-3 mb-2">userName</h1>
          <TextArea
            text="    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            nesciunt maxime consequuntur, aperiam eveniet tempore cumque
            temporibus laborum perferendis repudiandae,  sapiente totam error
            delectus nemo? Dicta quam assumenda exercitationem Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Excepturi eveniet quia
            quasi enim reprehenderit, cupiditate debitis minima magnam
            dignissimos velit consectetur, ex fugiat quo. Error, nostrum vel.
            Velit, esse tenetur!"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        {image && (
          <div className="w-[200px] ">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  {image && (
                    <img src={image} alt="text iamge" className="rounded-2xl" />
                  )}
                </CarouselItem>
                <CarouselItem>
                  {image && (
                    <img src={image} alt="text iamge" className="rounded-2xl" />
                  )}
                </CarouselItem>
                <CarouselItem>
                  {image && (
                    <img src={image} alt="text iamge" className="rounded-2xl" />
                  )}
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
      <div className="mt-5">
        <PostFooter />
      </div>
    </div>
  );
};

export default PostItem;

//add when people click show more open the page in the full page
// use input Text area for post input because it have \n it
