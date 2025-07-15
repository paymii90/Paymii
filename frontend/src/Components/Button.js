import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({
  action,
  backgroundColor = "#052644",
  label,
  color = "white",
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.9}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Text style={[styles.text, { color }, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 58,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
