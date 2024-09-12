/* eslint-disable react/no-unstable-nested-components */

import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { BottomNavigation, Icon } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingView from '@/components/UI/LoadingView'

const Layout = () => {
  const { router, sessionId } = useCustomRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'home' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleLoginUser = async () => {
      setLoading(true)
      if (sessionId) {
        const sessionResult = await AuthSingleton.getInstance().getSessionDetails()
        if (sessionResult.status !== 'SUCCESS') {
          router.replace({
            pathname: '(login)',
          })
        }
      } else {
        router.replace({
          pathname: '(login)',
        })
      }
      setLoading(false)
    }

    handleLoginUser()
  }, [sessionId])

  if (loading) {
    return <LoadingView />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
      tabBar={({
        state, descriptors, insets,
      }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route }) => {
            router.push(route.name)
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key]
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 })
            }

            return null
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key]
            if (typeof options.tabBarLabel === 'string') {
              return options.tabBarLabel
            }

            return undefined
          }}
        />
      )}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: t('home_page'),
          title: t('home_page'),
          tabBarIcon: ({ color, size }) => <Icon source="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          unmountOnBlur: true,
          tabBarLabel: t('favourites'),
          title: t('favourites'),
          tabBarIcon: ({ color, size }) => <Icon source="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: t('settings'),
          title: t('settings'),
          tabBarIcon: ({ color, size }) => <Icon source="cog" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default Layout
