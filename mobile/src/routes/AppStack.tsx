import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { Detail } from "../pages/Detail";
import { Incidents } from "../pages/Incidents";

const { Navigator, Screen } = createStackNavigator();

export function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Detail" component={Detail} />
        <Screen name="Incidents" component={Incidents} />
      </Navigator>
    </NavigationContainer>
  );
};