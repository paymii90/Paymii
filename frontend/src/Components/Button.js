import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ action, backgroundColor, label, color,style,labelStyle }) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.9}
      style={[styles.button, { backgroundColor },style]}
    >
      <Text style={[styles.text, { color },labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 58,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
