import React, { ReactElement, useState } from 'react'
import { Dimensions, FlatList } from 'react-native'

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
  const listRef = React.useRef<FlatList>(null)
  const [startScrollY, setStartScrollY] = useState<number>(0)
  const [actualIndex, setActualIndex] = useState<number>(0)
  const windowHeight = Dimensions.get('window').height

  const scrollToIndex = async (index: number) => {
    if (index >= 0 && index < localData.length) {
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index,
          animated: true,
        })
      }
      setActualIndex(index)
    }

    if (index > localData.length - 2) {
      if (fetchMoreData) {
        const fetchedData = await fetchMoreData()
        setLocalData([...localData, ...fetchedData])
      }
    }
  }

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
      onScrollBeginDrag={(event) => {
        const { y } = event.nativeEvent.contentOffset
        setStartScrollY(y)
      }}
      onScrollEndDrag={async (event) => {
        const { y } = event.nativeEvent.contentOffset
        const heightToScroll = windowHeight * 0.15
        const scrolled = y - startScrollY

        if (scrolled > heightToScroll) {
          await scrollToIndex(actualIndex + 1)
        } else if (scrolled < -heightToScroll) {
          await scrollToIndex(actualIndex - 1)
        } else {
          await scrollToIndex(actualIndex)
        }
      }}
    />
  )
}

export default CustomList
