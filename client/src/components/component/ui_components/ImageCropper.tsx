import { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/shadcnComponent/ui/button";

export interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropperProps {
  image: string;
  onCropCancel: () => void;
  onCropDone: (croppedArea: CroppedArea) => void;
}

export const ImageCropper = ({
  image,
  onCropCancel,
  onCropDone,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null);
  console.log("cropArea:", croppedArea);
  const onCropComplete = (croppedAreaPixels: CroppedArea) => {
    console.log("croppedAreaPixels:", croppedAreaPixels); // Debugging line
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-end items-end">
      <div className="flex justify-center items-center w-full gap-11">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: "100%",
              height: "100%",
            },
          }}
        />
      </div>
      <div className="absolute bottom-0 flex justify-center items-center w-full gap-7">
        <Button onClick={onCropCancel} className="text-white z-50">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (croppedArea) {
              console.log("Cropped Area:", croppedArea); // Debugging line
              onCropDone(croppedArea);
            }
          }}
          className="text-white z-50"
        >
          Crop and Apply
        </Button>
      </div>
    </div>
  );
};
