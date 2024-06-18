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

  const onCropComplete = (croppedArea: CroppedArea) => {
    setCroppedArea(croppedArea);
  };

  return (
    <div className="w-full h-full flex flex-col justify-end items-end">
      <div className="flex justify-center items-center w-full gap-11">
        <Button onClick={onCropCancel}>Cancel</Button>
        <Button
          onClick={() => {
            if (croppedArea) onCropDone(croppedArea);
          }}
          className="text-white z-50"
        >
          Crop and Apply
        </Button>
      </div>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={16 / 9}
        onCropChange={setCrop}
        onCropComplete={(croppedAreaPixels) =>
          onCropComplete(croppedAreaPixels)
        }
        onZoomChange={setZoom}
        style={{
          containerStyle: {
            width: "100%",
            height: "100%",
          },
        }}
      />
    </div>
  );
};
