import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/TabNavigatorScreens/HomeScreen';
import Cart from '../screens/TabNavigatorScreens/Cart';
import PRofile from '../screens/TabNavigatorScreens/Profile';
import Tabbar from './TabBar/TabBar';
import AboutProductScreen from '../screens/AboutProductScreen';
import ShopingBag from '../screens/ShopingBag';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const noHeaderStyle = {headerShown: false};
function HomeStackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{...noHeaderStyle}}
      />
      <Stack.Screen
        name="AboutProduct"
        component={AboutProductScreen}
        options={{...noHeaderStyle}}
      />
      <Stack.Screen name="Cart" component={Cart} options={{...noHeaderStyle}} />
      <Stack.Screen
        name="ShopingBag"
        component={ShopingBag}
        options={{...noHeaderStyle}}
      />
    </Stack.Navigator>
  );
}
const TabNavigator = () => {
  const {bottom, top} = useSafeAreaInsets();
  const paddingStyle = {paddingTop: top + 15, paddingBottom: bottom + 15};
  const noHeaderStyle = {headerShown: false};
  return (
    <Tab.Navigator tabBar={props => <Tabbar {...props} style={paddingStyle} />}>
      <Tab.Screen
        name="HomeStackScreens"
        component={HomeStackScreens}
        options={{...noHeaderStyle, tabBarLabel: 'Товары'}}
      />
      <Tab.Screen
        name="Profile"
        component={PRofile}
        options={{...noHeaderStyle, tabBarLabel: 'Профиль'}}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
