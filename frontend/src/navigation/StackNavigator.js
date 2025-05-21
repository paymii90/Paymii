import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Screen2 from '../screens/screen2';
import SignUp from '../screens/SignUp';
import EmailVerification from '../screens/EmailVerification';
import DigitVerification from '../screens/DigitVerification';
import SignIn from '../screens/SignIn';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Sign" component={Screen2} />
    <Stack.Screen name="Register" component={SignUp} />
    <Stack.Screen name="Email" component={EmailVerification} />
    <Stack.Screen name="Digit" component={DigitVerification} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);

export default StackNavigator;
