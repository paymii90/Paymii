import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/signup/HomeScreen";
import Screen2 from "./src/screens/signup/screen2";
import SignUp from "./src/screens/signup/SignUp";
import emailVerification from "./src/screens/signup/emailVerification";
import digitVerification from "./src/screens/signup/digitVerification";
import Progress1 from './src/screens/signup/progress1'
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
    Interlude: Progress1
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

export default createAppContainer(navigator);
