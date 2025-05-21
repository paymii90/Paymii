import { StyleSheet } from "react-native";
import Button from "../../src/Components/Button";

const SingleButtonItem = ({ item, isActive, setActiveButton }) => {
  return (
    <Button
      label={item.label}
      action={() => setActiveButton(item.label)} // Update on press
      backgroundColor={isActive ? "#ffffff" : "#31333F"}
      color="white"
      style={{
        borderRadius: 30,
        width: "15%",
        padding: 5,
        paddingHorizontal: 35,
        // // paddingVertical: 5,
        // paddingTop: 1,
        // paddingBottom: 1,
        marginRight: 10,
        borderWidth: isActive ? 1 : 0,
        borderColor: isActive ? "black" : "transparent",
      }}
      labelStyle={{
        fontWeight: isActive ? "700" : "500",
        color: isActive ? "black" : "white",
        fontSize: 12,
        textAlign: "center",
      }}
    />
  );
};

export default SingleButtonItem;

const styles = StyleSheet.create({});
