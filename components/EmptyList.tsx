import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface EmptyListProps {
  message: string;
}

export const EmptyList = ({ message = "No Items to show" }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/big-tulip-retail-logo.png")}
        style={styles.logo}
        resizeMode="cover"
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
