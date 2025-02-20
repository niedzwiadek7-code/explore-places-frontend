import React, { useState } from 'react'
import { ActivityIndicator, List } from 'react-native-paper'
import { useToast } from 'react-native-paper-toast'
import { SafeAreaView } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useTranslation } from 'react-i18next'
import Storage from '@/services/storage/Storage'
import ModalComponent from '@/components/UI/Modal'
import { useAuth } from '@/context/auth/Auth'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import { useThemeContext } from '@/context/theme/Theme'

const renderIcon = (color: string, style: object, icon: string) => (
  <List.Icon color={color} style={style} icon={icon} />
)

const renderFlag = (isoCode: string) => (
  <CountryFlag isoCode={isoCode} size={20} style={{ marginRight: 8 }} />
)

const Settings = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'settings' })
  const { logout } = useAuth()
  const { toggleTheme, isDark, theme } = useThemeContext()

  const [isLogout, setIsLogout] = useState(false)

  const changeLanguage = async (lang: string) => {
    await Storage.setItem('language', lang)
    await i18n.changeLanguage(lang)
  }

  const localLogout = async () => {
    setIsLogout(true)
    await AuthSingleton.getInstance().logout()
    await logout()
  }

  const showLoading = (shouldShow: boolean) => {
    if (shouldShow) {
      return <ActivityIndicator />
    }
    return null
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <List.Item
        title={t('theme')}
        description={isDark ? t('dark_theme') : t('light_theme')}
        // description={t('change_theme')}
        left={({ color, style }) => renderIcon(color, style, 'palette')}
        // onPress={() => toaster.show({
        //   message: t('in_progress'),
        // })}
        onPress={toggleTheme}
      />
      <ModalComponent
        button={(
          <List.Item
            title={t('language')}
            description={t('change_language')}
            left={({ color, style }) => renderIcon(color, style, 'translate')}
          />
        )}
      >
        <SafeAreaView
          style={{
            gap: 5,
          }}
        >
          <List.Subheader>
            {t('pick_language')}
          </List.Subheader>
          <List.Item
            title="Polski"
            style={{
              padding: 10,
            }}
            left={() => renderFlag('PL')}
            onPress={() => changeLanguage('pl-PL')}
          />
          <List.Item
            title="English"
            style={{
              padding: 10,
            }}
            left={() => renderFlag('GB')}
            onPress={() => changeLanguage('en-US')}
          />
        </SafeAreaView>
      </ModalComponent>
      <List.Item
        disabled={isLogout}
        title={t('logout')}
        description={t('app_logout')}
        left={({ color, style }) => renderIcon(color, style, 'logout')}
        right={() => showLoading(isLogout)}
        onPress={localLogout}
      />
    </SafeAreaView>
  )
}

export default Settings
