import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Account from "../screens/Account";
import CustomBottomTab from "./BottomTabs/CustomBottomTab";
import QuizeStartPage from "../screens/QuizeStartPage";
import QuizeResultPage from "../screens/QuizeResultPage";
import Notifications from "../screens/Notifications";
import CardsStartPage from "../screens/CardsStartPage";
import UnlockedCardsPage from "../screens/UnlockedCardsPage";
import CardsResultPage from "../screens/CardsResultPage";
import CardsStudyPage from "../screens/CardsStudyPage";

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
          options={{ headerShown: false, unmountOnBlur: true }}
        ></Tab.Screen>
        <Tab.Screen
          name="QuizeResultPage"
          component={QuizeResultPage}
          options={{ headerShown: false, unmountOnBlur: true }}
        ></Tab.Screen>
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        ></Tab.Screen>
        <Tab.Screen
          name="CardsStartPage"
          component={CardsStartPage}
          options={{ headerShown: false }}
        ></Tab.Screen>
        <Tab.Screen
          name="UnlockedCardsPage"
          component={UnlockedCardsPage}
          options={{ headerShown: false, unmountOnBlur: true }}
        ></Tab.Screen>
        <Tab.Screen
          name="CardsResultPage"
          component={CardsResultPage}
          options={{ headerShown: false, unmountOnBlur: true }}
        ></Tab.Screen>
        <Tab.Screen
          name="CardsStudyPage"
          component={CardsStudyPage}
          options={{ headerShown: false, unmountOnBlur: true }}
        ></Tab.Screen>
      </Tab.Group>
    </Tab.Navigator>
  );
}
