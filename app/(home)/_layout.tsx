/* eslint-disable react/no-unstable-nested-components */

import React from 'react'
import { Tabs } from 'expo-router'
import { BottomNavigation, Icon } from 'react-native-paper'
import useCustomRouter from '@/hooks/useRouter/useRouter'

const Layout = () => {
  const { router } = useCustomRouter()

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
          tabBarLabel: 'Home',
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Icon source="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarLabel: 'Favourites',
          title: 'Favourites',
          tabBarIcon: ({ color, size }) => <Icon source="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: 'Settings',
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon source="cog" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default Layout
