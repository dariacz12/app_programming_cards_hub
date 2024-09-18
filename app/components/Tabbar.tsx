import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Account from "../screens/Account";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import CustomBottomTab from "./BottomTabs/CustomBottomTab";

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Group screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{ tabBarLabel: "Account" }}
          name="Account"
          component={Account}
        />
         <Tab.Screen
          options={{ tabBarLabel: "Home" }}
          name="Home"
          component={Home}
        />
       
        {/* <Tab.Screen
          options={{ tabBarLabel: "Login" }}
          name="Login"
          component={Login}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Registration" }}
          name="Registration"
          component={Registration}
        /> */}
      </Tab.Group>
    </Tab.Navigator>
  );
}
