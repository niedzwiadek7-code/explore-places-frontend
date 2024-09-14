import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

class Storage {
  static async waitForWindowLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (Platform.OS !== 'web') {
        resolve()
        return
      }

      if (!window) {
        setTimeout(() => resolve(), 1000)
      } else {
        resolve()
      }
    })
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await Storage.waitForWindowLoad()
      await AsyncStorage.setItem(key, value)
    } catch (err) {
      console.error('Error setting item in storage')
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      await Storage.waitForWindowLoad()
      return AsyncStorage.getItem(key)
    } catch (err) {
      console.error('Error getting item from storage')
      return null
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await Storage.waitForWindowLoad()
      await AsyncStorage.removeItem(key)
    } catch (err) {
      console.error('Error removing item from storage')
    }
  }
}

export default Storage
