import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcnComponent/ui/carousel";

type ICarousel = {
  imageProp: [string];
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const CarouselComp = ({ imageProp, setOpenImage, open }: ICarousel) => {
  return (
    <div className="transition-all duration-150 ">
      <Carousel className="">
        <CarouselContent className="rounded-2xl ">
          {imageProp.map((img) => (
            <CarouselItem
              key={img}
              className="flex justify-center items-center"
            >
              <img
                src={`${img}`}
                alt={img}
                className=" w-dvw md:w-1/2 h-full object-contain "
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
