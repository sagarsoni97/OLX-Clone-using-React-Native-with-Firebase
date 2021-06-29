import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Add from '../Screens/createadscreen';
import Profile from '../Screens/profile';
import Home from '../Screens/home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (

    <Tab.Navigator>

<Tab.Screen name="Home" component={Home} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Add" component={Add} options={{
          tabBarLabel: 'Post Ad',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus-circle" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}/>
      
      
    </Tab.Navigator>
  );
};

export { BottomTabNavigator };