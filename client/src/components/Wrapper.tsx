import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

function Wrapper({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
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
