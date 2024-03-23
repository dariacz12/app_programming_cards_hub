import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import LandingApp from "./app/screens/LandingApp";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import PrivacyPolicy from "./app/screens/PrivacyPolicy";
import Registration from "./app/screens/Registration";
import Statute from "./app/screens/Statute";
import SuccessfulLoginRegistration from "./app/screens/SuccessfulLoginRegistration";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <React.Fragment>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => (
                  <Button onPress={onLogout} title="Sign Out" />
                ),
              }}
            ></Stack.Screen>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="LandingApp"
              component={LandingApp}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Statute"
              component={Statute}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="SuccesfullLoginRegistration"
              component={SuccessfulLoginRegistration}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
