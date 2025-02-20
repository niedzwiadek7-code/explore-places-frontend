import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react'
import * as Location from 'expo-location'
import { CoordinatesModel } from '@/models'

const LOCATION_REFRESH_INTERVAL = 10000

class CoordinatesClass {
  actualPosition: CoordinatesModel | null = null

  constructor(actualPosition: CoordinatesModel | null) {
    this.actualPosition = actualPosition
  }
}

const CoordinatesContext = createContext<CoordinatesClass>(new CoordinatesClass(null))

type ProviderProps = {
  children: React.ReactNode
}

export const CoordinatesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [actualPosition, setActualPosition] = useState<CoordinatesModel | null>(null)

  const getActualPosition = async (): Promise<CoordinatesModel | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return null
    }
    const location = await Location.getCurrentPositionAsync({})
    return new CoordinatesModel(
      location.coords.latitude,
      location.coords.longitude,
    )
  }

  useEffect(() => {
    const getCoords = async () => {
      const coords = await getActualPosition()
      if (coords) {
        setActualPosition(coords)
      }
    }

    const locationInterval = setInterval(async () => {
      await getCoords()
    }, LOCATION_REFRESH_INTERVAL)

    getCoords()

    return () => {
      clearInterval(locationInterval)
    }
  }, [])

  const value = useMemo(
    () => new CoordinatesClass(actualPosition),
    [actualPosition],
  )

  return (
    <CoordinatesContext.Provider value={value}>
      {children}
    </CoordinatesContext.Provider>
  )
}

export const useCoordinates = () => useContext(CoordinatesContext)
