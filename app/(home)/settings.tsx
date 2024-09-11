import React from 'react'
import { List } from 'react-native-paper'
import { useToast } from 'react-native-paper-toast'
import { SafeAreaView } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import ModalComponent from '@/components/UI/Modal'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

const renderIcon = (color: string, style: object, icon: string) => (
  <List.Icon color={color} style={style} icon={icon} />
)

const renderFlag = (isoCode: string) => (
  <CountryFlag isoCode={isoCode} size={20} style={{ marginRight: 8 }} />
)

const Settings = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'settings' })
  const {
    router,
  } = useCustomRouter()

  const localLogout = async () => {
    await AuthSingleton.getInstance().logout()
    ApiBackendSingleton.setSessionId()
    router.replace('/')
  }

  const toaster = useToast()

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('language', lang)
    await i18n.changeLanguage(lang)
  }

  return (
    <>
      <List.Item
        title={t('theme')}
        description={t('change_theme')}
        left={({ color, style }) => renderIcon(color, style, 'palette')}
        onPress={() => toaster.show({
          message: t('in_progress'),
        })}
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
        title={t('logout')}
        description={t('app_logout')}
        left={({ color, style }) => renderIcon(color, style, 'logout')}
        onPress={localLogout}
      />
    </>
  )
}

export default Settings
