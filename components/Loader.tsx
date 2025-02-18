import React, { PropsWithChildren } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/colors";

export function Loader({ children }: PropsWithChildren) {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
