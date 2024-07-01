import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcnComponent/ui/carousel";
import { baseUrl } from "@/lib/basedURL";

type ICarousel = {
  imageProp: [string];
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const CarouselComp = ({ imageProp, setOpenImage, open }: ICarousel) => {
  return (
    <div className="w-full  md:w-full transition-all duration-150 ">
      <Carousel className="md:w-full h-full">
        <CarouselContent className="rounded-2xl">
          {imageProp.map((img) => (
            <CarouselItem key={img} className="">
              <img
                src={`${baseUrl}/img/posts/${img}`}
                alt={img}
                className=" w-full md:w-full h-full object-contain "
                onClick={() => setOpenImage(true)}
              />
            </CarouselItem>
          ))}{" "}
        </CarouselContent>
        {imageProp.length > 1 && open && (
          <CarouselPrevious className="md:flex hidden" />
        )}
        {imageProp.length > 1 && open && (
          <CarouselNext className="md:flex hidden" />
        )}
      </Carousel>
    </div>
  );
};

export default CarouselComp;
