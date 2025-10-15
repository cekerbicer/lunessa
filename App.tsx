// App.tsx
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Ekranlar
import LogoScreen from "./screens/ilkAdım/animation";
import LoginScreen from "./screens/ilkAdım/login";
import RegisterScreen from "./screens/ilkAdım/register";
import PhotoScreen from "./screens/testKısmı/photo";
import TestScreen from "./screens/testKısmı/test";
import WaitScreen from "./screens/testKısmı/wait";
import ResultScreen from "./screens/testKısmı/results";
import HabitScreen from "./screens/testKısmı/habit";
import HomeScreen from "./screens/anaSayfa/home";
import GraphicsScreen from "./screens/anaSayfa/graphics";
import ProfileScreen from "./screens/anaSayfa/profile";

export type RootStackParamList = {
  Logo: undefined;
  Login: undefined;
  Register: undefined;
  Photo: undefined;
  Test: undefined;
  Wait: undefined;
  Result: undefined;
  Habit: undefined;
  Home: undefined;
  Graphic: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Wait" component={WaitScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Habit" component={HabitScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Graphic" component={GraphicsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}