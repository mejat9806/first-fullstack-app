import { Button } from "@/shadcnComponent/ui/button";
import React, { useRef } from "react";

interface TypeForProps {
  onImageSelected: (imageDataUrl: string) => void;
}

const FileInputwithCrop = ({ onImageSelected }: TypeForProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        onImageSelected(reader.result as string);
      };
    }
  };
  const onChooseImage = () => {
    inputRef.current?.click();
  };
  return (
    <div className="flex flex-col justify-end h-full">
      <input
        className="hidden"
        type="file"
        accept="=image/*"
        ref={inputRef}
        onChange={handleOnChange}
      />
      <Button onClick={onChooseImage}>Choose image</Button>
    </div>
  );
};

export default FileInputwithCrop;
