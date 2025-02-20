import React, {
  createContext, useContext, useState, useMemo,
} from 'react'
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  MD3Theme as Theme,
} from 'react-native-paper'

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4A90E2',
    onPrimary: '#FFFFFF',
    primaryContainer: '#1E3A8A',
    onPrimaryContainer: '#D1E8FF',

    secondary: '#357ABD', // Stonowany niebieski zamiast czerwieni
    onSecondary: '#FFFFFF',
    secondaryContainer: '#2B5C8A',
    onSecondaryContainer: '#BFDFFF',

    tertiary: '#4B0082',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#9370DB',
    onTertiaryContainer: '#E6E6FA',

    background: '#121212',
    onBackground: '#FFFFFF',

    surface: '#1E1E1E',
    onSurface: '#FFFFFF',
    surfaceVariant: '#2C2C2C',
    onSurfaceVariant: '#DDDDDD',

    error: '#CF6679',
    onError: '#FFFFFF',
    errorContainer: '#B00020',
    onErrorContainer: '#FFCDD2',

    outline: '#888888',
    outlineVariant: '#AAAAAA',

    inverseSurface: '#FFFFFF',
    inverseOnSurface: '#000000',
    inversePrimary: '#4A90E2',

    shadow: '#000000',
    scrim: '#000000',

    elevation: {
      level0: 'transparent',
      level1: '#1E1E1E',
      level2: '#2C2C2C',
      level3: '#3A3A3A',
      level4: '#484848',
      level5: '#565656',
    },

    navigationBar: {
      background: '#1E1E1E',
      onBackground: '#FFFFFF',
    },

    button: {
      primary: '#4A90E2',
      onPrimary: '#FFFFFF',
      secondary: '#357ABD',
      onSecondary: '#FFFFFF',
    },

    icon: {
      primary: '#4A90E2',
      secondary: '#357ABD',
      tertiary: '#4B0082',
    },
  },
}

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4A90E2',
    onPrimary: '#FFFFFF',
    primaryContainer: '#D1E8FF',
    onPrimaryContainer: '#1E3A8A',

    secondary: '#5B9BD5', // Stonowany niebieski zamiast czerwieni
    onSecondary: '#FFFFFF',
    secondaryContainer: '#CFE2F3',
    onSecondaryContainer: '#2B5C8A',

    tertiary: '#4B0082',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#E6E6FA',
    onTertiaryContainer: '#9370DB',

    background: '#FFFFFF',
    onBackground: '#000000',

    surface: '#F5F5F5',
    onSurface: '#000000',
    surfaceVariant: '#E0E0E0',
    onSurfaceVariant: '#333333',

    error: '#B00020',
    onError: '#FFFFFF',
    errorContainer: '#FFCDD2',
    onErrorContainer: '#B00020',

    outline: '#666666',
    outlineVariant: '#999999',

    inverseSurface: '#121212',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#1E3A8A',

    shadow: '#000000',
    scrim: '#000000',

    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#E0E0E0',
      level3: '#CCCCCC',
      level4: '#B8B8B8',
      level5: '#A4A4A4',
    },

    navigationBar: {
      background: '#F5F5F5',
      onBackground: '#000000',
    },

    button: {
      primary: '#4A90E2',
      onPrimary: '#FFFFFF',
      secondary: '#5B9BD5',
      onSecondary: '#FFFFFF',
    },

    icon: {
      primary: '#4A90E2',
      secondary: '#5B9BD5',
      tertiary: '#4B0082',
    },
  },
}

class ThemeClass {
  isDark: boolean

  toggleTheme: () => void

  theme: Theme

  constructor(
    isDark: boolean = false,
    toggleTheme: () => void = () => {},
    theme: Theme = DefaultTheme,
  ) {
    this.isDark = isDark
    this.toggleTheme = toggleTheme
    this.theme = theme
  }
}

const ThemeContext = createContext<ThemeClass>(new ThemeClass())

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => setIsDark((prev) => !prev)

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark])

  const value = useMemo(
    () => new ThemeClass(isDark, toggleTheme, theme),
    [isDark, toggleTheme, theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
