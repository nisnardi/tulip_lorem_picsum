import { useContext, useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { fetchPicsumImageList } from "@/utils/fetch";
import { PicsumPhoto } from "@/types/response";
import PhotoList from "@/components/PhotoList";
import { Loader } from "@/components/Loader";
import {
  requestNotificationsPermission,
  sendLocalNotification,
  setNotificationHandler,
} from "@/utils/notifications";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/colors";
import { Link, useLocalSearchParams } from "expo-router";
import { PhotosContext } from "@/context/photosContext";

const NOTIFICATION_PERMISSION_ERROR =
  "Notification Permission Required.\n Please enable notifications in Settings.";

setNotificationHandler();

export default function Index() {
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);
  const context = useContext(PhotosContext);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  if (!context) {
    throw new Error("Gallery must be used within a PhotosProvider");
  }

  const { images, setImages } = context;

  useEffect(() => {
    async function checkNotificationsPermissionStatus() {
      const status = await requestNotificationsPermission();
      setPermissionStatus(status);
    }

    checkNotificationsPermissionStatus();
  }, []);

  useEffect(() => {
    async function fetchImageList() {
      try {
        setIsLoading(true);
        if (!Boolean(params.newphoto)) {
          const imageList = await fetchPicsumImageList();
          setImages(imageList);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImageList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  async function onPhotoPressHandler(photo: PicsumPhoto) {
    if (permissionStatus !== Notifications.PermissionStatus.GRANTED) {
      Alert.alert(NOTIFICATION_PERMISSION_ERROR);
      return;
    }

    await sendLocalNotification("Picsum Photos", `Author: ${photo.author}`);
  }

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <PhotoList photos={images} onPhotoPress={onPhotoPressHandler} />
      <View style={styles.buttonContainer}>
        <Link href="/photo">
          <Ionicons name="add" size={32} color={COLORS.primary} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-end",
    paddingBottom: 10,
    paddingRight: 10,
  },
});
