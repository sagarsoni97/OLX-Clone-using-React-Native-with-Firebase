import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading()
 {
  
  return (
    <LottieView 
    source={require('../JSON/sagar.json')} autoPlay loop />
    
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

 

});
