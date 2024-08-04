import React, { ReactElement, useState } from 'react'
import { Dimensions, FlatList } from 'react-native'

type IBasicObj = {
  id: string | number
}

type IProps<T extends IBasicObj> = {
  data: T[]
  renderItem: (item: T) => ReactElement,
}

const CustomList = <T extends IBasicObj>({ data, renderItem }: IProps<T>) => {
  const listRef = React.useRef<FlatList>(null)
  const [startScrollY, setStartScrollY] = useState<number>(0)
  const [actualIndex, setActualIndex] = useState<number>(0)
  const windowHeight = Dimensions.get('window').height

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < data.length) {
      setActualIndex(index)
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index,
          animated: true,
        })
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
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={(event) => {
        const { y } = event.nativeEvent.contentOffset
        setStartScrollY(y)
      }}
      onScrollEndDrag={(event) => {
        const { y } = event.nativeEvent.contentOffset
        const heightToScroll = windowHeight * 0.15
        const scrolled = y - startScrollY

        if (scrolled > heightToScroll) {
          scrollToIndex(actualIndex + 1)
        } else if (scrolled < -heightToScroll) {
          scrollToIndex(actualIndex - 1)
        } else {
          scrollToIndex(actualIndex)
        }
      }}
    />
  )
}

export default CustomList
