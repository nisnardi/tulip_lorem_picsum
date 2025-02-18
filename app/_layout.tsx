import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";
import { PhotosProvider } from "@/context/photosContext";

export default function RootLayout() {
  return (
    <PhotosProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header />,
            contentStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
        <Stack.Screen
          name="photo"
          options={{
            title: "Add New Photo",
            contentStyle: {
              backgroundColor: COLORS.white,
            },
          }}
        />
      </Stack>
    </PhotosProvider>
  );
}
