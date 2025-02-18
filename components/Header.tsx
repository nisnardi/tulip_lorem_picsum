import React from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LOGO_SIZE = 30;

export const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        source={require("@/assets/images/tulip-retail-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Tulip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: LOGO_SIZE, height: LOGO_SIZE },
  text: {
    fontSize: 24,
    marginLeft: 5,
    color: COLORS.primary,
  },
});
