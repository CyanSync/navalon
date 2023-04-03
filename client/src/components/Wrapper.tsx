import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

function Wrapper({
  children,
  shouldCenterVertically = true,
}: {
  children: ReactNode;
  shouldCenterVertically?: boolean;
}) {
  return (
    <View
      style={[styles.container, shouldCenterVertically ? {} : { justifyContent: "flex-start" }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
export { Wrapper };
