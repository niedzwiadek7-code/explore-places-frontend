/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'

// TODO: in future, usePagination should use / be refactored to useFetch

type DataType<T> = T extends Array<any> ? T : T | undefined

interface FetchHookProps<T> {
  fetchData: () => Promise<DataType<T>>,
  defaultData: DataType<T>
}

interface FetchHookResult<T> {
  data: DataType<T>
  loading: boolean
  setData: (data: DataType<T>) => void
}

const useFetch = <T>({
  fetchData,
  defaultData,
}: FetchHookProps<T>, dependencies: any[] = []): FetchHookResult<T> => {
  const [data, setData] = useState<DataType<T>>(defaultData)
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    try {
      const result = await fetchData()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, dependencies)

  return {
    data,
    loading,
    setData,
  }
}

export default useFetch
