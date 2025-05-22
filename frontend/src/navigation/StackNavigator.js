import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/signup/HomeScreen'
import Screen2 from '../screens/signup/screen2';
import SignUp from '../screens/signup/SignUp';
import EmailVerification from '../screens/signup/emailVerification';
import DigitVerification from '../screens/signup/digitVerification';
import SignIn from '../screens/signup/SignIn';
import TabNavigator from './TabNavigator';
import Progress1 from '../screens/signup/progress1';

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
    <Stack.Screen name="Interlude" component={Progress1} />
  </Stack.Navigator>
);

export default StackNavigator;
