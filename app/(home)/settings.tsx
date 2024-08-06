import React from 'react'
import { List } from 'react-native-paper'
import { useToast } from 'react-native-paper-toast'
import { useAuth } from '@/context/auth/Auth'
import useCustomRouter from '@/hooks/useRouter/useRouter'

const renderIcon = (color: string, style: object, icon: string) => (
  <List.Icon color={color} style={style} icon={icon} />
)

const Settings = () => {
  const { logout } = useAuth()
  const {
    router,
  } = useCustomRouter()

  const localLogout = async () => {
    await logout()
    router.replace('/')
  }

  const toaster = useToast()

  return (
    <>
      <List.Item
        title="Motyw"
        description="Zmień motyw aplikacji"
        left={({ color, style }) => renderIcon(color, style, 'palette')}
        onPress={() => toaster.show({
          message: 'Funkcjonalność w przygotowaniu',
        })}
      />
      <List.Item
        title="Język"
        description="Zmień język aplikacji"
        left={({ color, style }) => renderIcon(color, style, 'translate')}
        onPress={() => toaster.show({
          message: 'Funkcjonalność w przygotowaniu',
        })}
      />
      <List.Item
        title="Wyloguj się"
        description="Wyloguj się z aplikacji"
        left={({ color, style }) => renderIcon(color, style, 'logout')}
        onPress={localLogout}
      />
    </>
  )
}

export default Settings
