import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { PicsumPhoto } from "@/types/response";
import { COLORS } from "@/constants/colors";

interface PhotoListItemProps {
  photo: PicsumPhoto;
  onPhotoPress: (photo: PicsumPhoto) => void;
}

function ImageLoader({ author }: { author: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
      <Text>Author: {author}</Text>
    </View>
  );
}

const PhotoListItem: React.FC<PhotoListItemProps> = ({
  photo,
  onPhotoPress,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const onPressHandler = () => {
    if (isLoading) {
      return;
    }

    onPhotoPress(photo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressHandler} activeOpacity={0.8}>
        {isLoading && <ImageLoader author={photo.author} />}
        <Image
          style={styles.photo}
          source={{ uri: photo.download_url }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          resizeMode="cover"
        />
        <Text>Author: {photo.author}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  photo: {
    flex: 1,
    height: 300,
    borderRadius: 12,
    marginBottom: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    borderRadius: 12,
    marginBottom: 8,
  },
});
