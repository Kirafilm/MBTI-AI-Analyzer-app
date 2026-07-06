import { Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

if (Platform.OS === "web") {
  void MaterialIcons.loadFont();
}
