import { Button } from "@/shadcnComponent/ui/button";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
export interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropperProps {
  image: string;
  onCropCancel: () => void;
  onCropDone: (croppedArea: CroppedArea | null) => void;
}
export const ImageCropper = ({
  image,
  onCropCancel,
  onCropDone,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState(21 / 9);

  const onCropComplete = (CroppedAreaPixel: CroppedArea) => {
    console.log(CroppedAreaPixel);
    setCroppedArea(CroppedAreaPixel);
  };
  return (
    <div className="w-full h-full flex flex-col justify-end items-end ">
      <div className="flex justify-center items-center w-full gap-11">
        <Button onClick={onCropCancel}>Cancel</Button>
        <Button
          onClick={() => onCropDone(croppedArea)}
          className="text-white z-50"
        >
          Crop and Apply
        </Button>
      </div>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatio}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        style={{
          containerStyle: {
            width: "100%",
            height: "80%",
          },
        }}
      />
    </div>
  );
};
