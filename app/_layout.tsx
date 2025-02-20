/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */

import React, { useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import '@/i18n'

// import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import {
  MD3LightTheme, MD3DarkTheme, PaperProvider,
} from 'react-native-paper'
import { ToastProvider } from 'react-native-paper-toast'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AuthProvider } from '@/context/auth/Auth'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import { CoordinatesProvider } from '@/context/coordinates/Coordinates'

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
  // const { theme } = useMaterial3Theme({
  //   fallbackSourceColor: '#3B5998',
  //   fallbackSourceColor: '#FFFFFF',
  //   sourceColor: '#3B5998',
  // sourceColor: '#FFF000',
  // })

  const { sessionId } = useCustomRouter()

  useEffect(() => {
    if (!sessionId) {
      ActivitiesSingleton.getInstance().getActivityViewsService().unmount()
      return
    }
    ActivitiesSingleton.getInstance().getActivityViewsService().init()
  }, [sessionId])

  const paperTheme = colorScheme === 'dark'
    ? { ...MD3DarkTheme }
    : { ...MD3LightTheme }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <PaperProvider theme={paperTheme}>
          <ToastProvider>
            <Stack initialRouteName="(login)">
              <Stack.Screen name="(login)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
            </Stack>
          </ToastProvider>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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

  return (
    <AuthProvider>
      <CoordinatesProvider>
        <RootLayoutNav />
      </CoordinatesProvider>
    </AuthProvider>
  )
}

export default RootLayout
