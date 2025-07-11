import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EmailVerification from "../screens/signup/emailVerification";
import DigitVerification from "../screens/signup/digitVerification";

// import TabNavigator from "./TabNavigator";
import Progress1 from "../screens/signup/progress1";
import ScanScreen from "../screens/signup/Scan";
import PhoneNumber from "../screens/signup/PhoneNumber";
import PhoneAuthentication from "../screens/signup/PhoneAuthentication";
import Citizenship from "../screens/signup/Citizenship";
import IdentityVerification from "../screens/signup/IdentityVerification";
import PersonalInformation from "../screens/signup/PersonalInformation";
import Address from "../screens/signup/Address";

const Stack = createNativeStackNavigator();

const VerificationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Email" component={EmailVerification} />
    <Stack.Screen name="Digit" component={DigitVerification} />
    {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
    <Stack.Screen name="Interlude" component={Progress1} />
    <Stack.Screen name="Scan" component={ScanScreen} />
    <Stack.Screen name="Phone" component={PhoneNumber} />
    <Stack.Screen name="PhoneAuth" component={PhoneAuthentication} />
    <Stack.Screen name="Citizenship" component={Citizenship} />
    <Stack.Screen name="Verification" component={IdentityVerification} />
    <Stack.Screen name="Information" component={PersonalInformation} />
    <Stack.Screen name="Address" component={Address} />
  </Stack.Navigator>
);

export default VerificationStack;
