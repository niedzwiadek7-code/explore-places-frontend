import React, { ReactElement, useRef, useState } from 'react'
import { FlatList } from 'react-native'

type IBasicObj = {
  id: string | number
}

type IProps<T extends IBasicObj> = {
  data: T[],
  renderItem: (item: T) => ReactElement,
  fetchMoreData?: () => Promise<T[]>,
}

const CustomList = <T extends IBasicObj>({ data, fetchMoreData, renderItem }: IProps<T>) => {
  const [localData, setLocalData] = useState<T[]>(data)
  const listRef = useRef<FlatList>(null)

  return (
    <FlatList
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      contentContainerStyle={{
        flex: 1,
      }}
      ref={listRef}
      data={localData}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={async ({ viewableItems }) => {
        const actualIndex = viewableItems[0].index
        if (actualIndex && actualIndex > localData.length - 2 && fetchMoreData) {
          const newData = await fetchMoreData()
          setLocalData([...localData, ...newData])
        }
      }}
      pagingEnabled
    />
  )
}

export default CustomList
