import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
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

const NOTIFICATION_PERMISSION_ERROR =
  "Notification Permission Required.\n Please enable notifications in Settings.";

setNotificationHandler();

export default function Index() {
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);
  const [images, setImages] = useState<PicsumPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

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
        const imageList = await fetchPicsumImageList();
        setImages(imageList);
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
    </View>
  );
}
