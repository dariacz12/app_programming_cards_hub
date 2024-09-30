import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import PrivacyPolicy from "./app/screens/PrivacyPolicy";
import Registration from "./app/screens/Registration";
import Statute from "./app/screens/Statute";
import SuccessfulLoginRegistration from "./app/screens/SuccessfulLoginRegistration";
import React from "react";
import ForgotPassword from "./app/screens/ForgotPassword";
import ResetPassword from "./app/screens/NewPassword";
import NewPassword from "./app/screens/NewPassword";
import SuccessfullPasswordRegistration from "./app/screens/SuccessfullPasswordReset";
import SuccessfullPasswordReset from "./app/screens/SuccessfullPasswordReset";
import Account from "./app/screens/Account";
import Tabbar from "./app/components/Tabbar";
import QuizeQuestion from "./app/screens/QuizeQuestion";
import QuizeStartPage from "./app/screens/QuizeStartPage";
import QuizeResultPage from "./app/screens/QuizeResultPage";
import Notifications from "./app/screens/Notifications";
import CardsStartPage from "./app/screens/CardsStartPage";

AppRegistry.registerComponent("main", () => App);
if (Platform.OS === "web") {
  const rootTag =
    document.getElementById("root") || document.getElementById("X");
  AppRegistry.runApplication("main", { rootTag });
}

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
        {!authState?.authenticated ? (
          <React.Fragment>
            <Stack.Screen
              name="Tabbar"
              component={Tabbar}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="CardsStartPage"
              component={CardsStartPage}
              options={{ headerShown: false }}
            ></Stack.Screen> 
            
             <Stack.Screen
              name="QuizeQuestion"
              component={QuizeQuestion}
              options={{ headerShown: false }}
            ></Stack.Screen> 
           <Stack.Screen
              name="QuizeResultPage"
              component={QuizeResultPage}
              options={{ headerShown: false }}
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
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="SuccessfullPasswordReset"
              component={SuccessfullPasswordReset}
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
