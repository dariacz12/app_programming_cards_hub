import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Account from "../screens/Account";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import CustomBottomTab from "./BottomTabs/CustomBottomTab";
import QuizeStartPage from "../screens/QuizeStartPage";
import QuizeQuestion from "../screens/QuizeQuestion";
import QuizeResultPage from "../screens/QuizeResultPage";
import Notifications from "../screens/Notifications";
import CardsStartPage from "../screens/CardsStartPage";

const Tab = createBottomTabNavigator();

export default function Tabbar() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Group screenOptions={{ headerShown: false }}>
       
         <Tab.Screen
          options={{ tabBarLabel: "Home" }}
          name="Home"
          component={Home}
        />
         <Tab.Screen
          options={{ tabBarLabel: "Account" }}
          name="Account"
          component={Account}
        />
         <Tab.Screen
              name="QuizeStartPage"
              component={QuizeStartPage}
              options={{ headerShown: false }}
            ></Tab.Screen> 
              <Tab.Screen
              name="Notifications"
              component={Notifications}
              options={{ headerShown: false }}
            ></Tab.Screen> 
            {/* <Tab.Screen
              name="CardsStartPage"
              component={CardsStartPage}
              options={{ headerShown: false }}
            ></Tab.Screen>  */}
{/*        
        <Tab.Screen
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
