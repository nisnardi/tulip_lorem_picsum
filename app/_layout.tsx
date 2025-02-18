import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { Header } from "@/components/Header";

export default function RootLayout() {
  return (
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
    </Stack>
  );
}
