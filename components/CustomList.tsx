import React, {
  ReactElement, memo, useRef, useState,
} from 'react'
import { FlatList, ViewToken } from 'react-native'

type IBasicObj = {
  id: string | number
}

type IProps<T extends IBasicObj> = {
  data: T[],
  renderItem: (item: T) => ReactElement,
  fetchMoreData?: () => Promise<T[]>,
  index?: number,
}

const CustomList = <T extends IBasicObj>(
  {
    data,
    fetchMoreData,
    renderItem,
    index = 0,
  }: IProps<T>,
) => {
  const [localData, setLocalData] = useState<T[]>(data)
  const listRef = useRef<FlatList>(null)
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchMoreData = async (
    viewableItems: ViewToken<T>[],
  ) => {
    if (isFetching) {
      return
    }
    const actualIndex = viewableItems[0].index
    if (actualIndex && actualIndex > localData.length - 5 && fetchMoreData) {
      setIsFetching(true)
      const newData = (await fetchMoreData()).filter((e) => !localData.find((l) => l.id === e.id))
      setLocalData([...localData, ...newData])
      setIsFetching(false)
    }
  }

  // listRef.current?.scrollToIndex({
  //   index,
  //   animated: true,
  // })

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
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={async ({ viewableItems }) => handleFetchMoreData(viewableItems)}
      initialNumToRender={10}
      pagingEnabled
      onLayout={async () => {
        // TODO: Fix this hack
        const wait = new Promise((resolve) => setTimeout(resolve, 0))
        await wait
        listRef.current?.scrollToIndex({
          index,
          animated: false,
        })
      }}
    />
  )
}

export default CustomList
