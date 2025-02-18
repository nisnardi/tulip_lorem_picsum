import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function requestNotificationsPermission() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default Channel",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  return status;
}

export function setNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function sendLocalNotification(title: string, body: string) {
  const notification: Notifications.NotificationRequestInput = {
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: null,
  };

  await Notifications.scheduleNotificationAsync(notification);
}
