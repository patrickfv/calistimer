import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'

import {
   EMONScreen,
   HomeScreen,
   EMOM_SCREEN_NAME,
   HOME_SCREEN_NAME } from './app/screens'
import { initLoadFonts } from './app/styles'

const Stack = createStackNavigator()

export default function App() {
  const [loaded, setLoaded] = useState(false)

  if(!loaded) return (
    <AppLoading
      startAsync={initLoadFonts}
      onFinish={() => setLoaded(true)}
      onError={() => {}} />
  )

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name={HOME_SCREEN_NAME} component={HomeScreen} />
          <Stack.Screen name={EMOM_SCREEN_NAME} component={EMONScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}