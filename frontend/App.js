import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TabNavigator from "./src/navigation/TabNavigator";
import HomeScreen from "./src/screens/HomeScreen";
import Screen2 from "./src/screens/screen2";
import SignUp from "./src/screens/SignUp";
import emailVerification from "./src/screens/emailVerification";
import digitVerification from "./src/screens/digitVerification";
import SignIn from "./src/screens/SignIn";

//for fixing some navigation errors
import { Linking } from "react-native";
import { Dimensions } from "react-native";
//import ComponentScreen from "./src/screens/ComponentScreen";
// import ListScreen from "./src/screens/ListScreen";
// import ImageScreen from "./src/screens/ImageScreen";
// import counterScreen from "./src/screens/counterScreen";
// import ColorScreen from "./src/screens/ColorScreen";
// import SquareScreen from "./src/screens/SquareScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Sign: Screen2,
    Register: SignUp,
    Email: emailVerification,
    Digit: digitVerification,
    SignIn: SignIn,
    Main: TabNavigator,
  
    //  Components: ComponentScreen,
    // List: ListScreen,
    // Image: ImageScreen,
    // Counter: counterScreen,
    // Color: ColorScreen,
    // Square: SquareScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      // title: "App",
      headerShown: false,
    },
  }
);



//just for some errors
// Patch removeEventListener if it's missing
if (!Linking.removeEventListener) {
  Linking.removeEventListener = () => {};
}
if (!Dimensions.removeEventListener) {
  Dimensions.removeEventListener = () => {};
}

export default createAppContainer(navigator);
