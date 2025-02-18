import React, { useCallback } from "react";
import { FlatList } from "react-native";
import PhotoListItem from "./PhotoListItem";
import { PicsumPhoto } from "@/types/response";

interface PhotoListProps {
  photos: PicsumPhoto[];
  onPhotoPress: (photo: PicsumPhoto) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({ photos, onPhotoPress }) => {
  const renderItem = useCallback(({ item: photo }: { item: PicsumPhoto }) => {
    return <PhotoListItem photo={photo} onPhotoPress={onPhotoPress} />;
  }, []);

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PhotoList;
