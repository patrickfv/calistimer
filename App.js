import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'

import { EMONScreen, HomeScreen } from './app/screens'
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
          <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
          <Stack.Screen name="EMON_SCREEN" component={EMONScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}