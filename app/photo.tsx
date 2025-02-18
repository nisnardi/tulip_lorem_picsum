import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { PhotosContext } from "@/context/photosContext";
import { PicsumPhoto } from "@/types/response";

export default function Photo() {
  const context = useContext(PhotosContext);
  const [newUrl, setNewUrl] = useState("");

  if (!context) {
    throw new Error("Gallery must be used within a PhotosProvider");
  }

  const { images, setImages } = context;

  const onPressHandler = () => {
    const newPhoto: PicsumPhoto = {
      id: "30",
      author: "Nicolas Isnardi",
      width: 300,
      height: 200,
      url: "https://unsplash.com/photos/LNRyGwIJr5c",
      download_url: newUrl,
    };

    const newPhotosList = [newPhoto, ...images];

    setImages(newPhotosList);
    router.push("/?newphoto=true");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textLabel}>
        <Text style={styles.text}>URL:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please input a photo URL"
          value={newUrl}
          onChangeText={(value) => {
            setNewUrl(value);
          }}
        />
        <Pressable onPress={onPressHandler}>
          <Ionicons name="add" size={32} color={COLORS.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderColor: COLORS.primary,
    fontSize: 16,
    padding: 5,
  },
  textLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  text: { fontWeight: "bold" },
});
