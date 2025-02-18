import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import PhotoListItem from "./PhotoListItem";
import { PicsumPhoto } from "@/types/response";
import { EmptyList } from "./EmptyList";

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
      ListEmptyComponent={<EmptyList message="No Photos to show" />}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: { flexGrow: 1 },
});
