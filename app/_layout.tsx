/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */

import React, { useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'

import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import {
  MD3LightTheme, MD3DarkTheme, PaperProvider,
} from 'react-native-paper'
import { ToastProvider } from 'react-native-paper-toast'
import { AuthProvider } from '@/context/auth/Auth'
import { ActivitiesProvider } from '@/context/activities/Activities'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(login)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()
  const { theme } = useMaterial3Theme()

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme, colors: theme.dark }
    : { ...MD3LightTheme, colors: theme.light }

  return (
    <PaperProvider theme={paperTheme}>
      <ToastProvider>
        <AuthProvider>
          <ActivitiesProvider>
            <Stack initialRouteName="(login)">
              <Stack.Screen name="(login)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
            </Stack>
          </ActivitiesProvider>
        </AuthProvider>
      </ToastProvider>
    </PaperProvider>
  )
}

const RootLayout = () => {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line global-require
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // eslint-disable-next-line global-require
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    // eslint-disable-next-line global-require
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

export default RootLayout
