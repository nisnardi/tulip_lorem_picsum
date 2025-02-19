import React, { PropsWithChildren, createContext, useState } from "react";
import { PicsumPhoto } from "@/types/response";

interface PhotoContextProps {
  images: PicsumPhoto[];
  setImages: React.Dispatch<React.SetStateAction<PicsumPhoto[]>>;
}

export const PhotosContext = createContext<PhotoContextProps | null>(null);

export const PhotosProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = useState<PicsumPhoto[]>([]);

  return (
    <PhotosContext.Provider value={{ images, setImages }}>
      {children}
    </PhotosContext.Provider>
  );
};
