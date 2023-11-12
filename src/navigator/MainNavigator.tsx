import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LogIn from '../screens/LogIn';
import TabNavigator from './TabNavigator';

export type LoginStackParamList = {
  SignIn: undefined;
};

export type MainStackParamList = {
  HomeScreen: undefined;
  Cart: undefined;
  LogIn: {} | undefined;
  TabNavigator: undefined;
  Profile: undefined;
  AboutProduct: undefined;
  ShopingBag: {} | undefined;
};
export type AppStackScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'HomeScreen'
>;

const MainNavigator = () => {
  const noHeaderStyle = {headerShown: false};

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={LogIn}
        name="LogIn"
        options={{...noHeaderStyle, gestureEnabled: false}}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{...noHeaderStyle, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
