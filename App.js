
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Providers from './Navigation/index';
import Loading from './Screens/Loading'

export default function App() {

  const [load,setLoad]=useState(true)

 async function performload()
 {
   return new Promise(response=>
   {
     setTimeout(()=>{response("")},5000)
   })
 }

 
  useEffect(() => 
  {
   async function apicall()
    {
        const d= await performload()
  if(d!==null)
  {
    setLoad(false)
  }
    }
    apicall() 
  });

if(load)
{
  return (<Loading />)
}
else
{
  return (
    <Providers />
  );
}
  
}