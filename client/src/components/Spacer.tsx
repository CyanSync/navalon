import React from "react";
import { View } from "react-native";

const Spacer = ({ height = 10, width = 10 }) => {
  return <View style={{ height, width }} />;
};

export { Spacer };
