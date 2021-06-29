import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../Screens/login';
import Registration from '../Screens/registration';

const Stack = createStackNavigator();

export default function StackNavigation(){
    return (
      <Stack.Navigator>
          
      <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>

      </Stack.Navigator>
    );
  }

export { StackNavigation };