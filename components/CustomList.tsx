import React, {
  ReactElement, useRef, useState,
} from 'react'
import { FlatList, View, ViewToken } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

type IBasicObj = {
  id: string | number
}

type IProps<T extends IBasicObj> = {
  data: T[],
  renderItem: (item: T) => ReactElement,
  fetchMoreData?: (ignoreIds: (string | number)[]) => Promise<T[]>,
  index?: number,
}

type ISmallLoadingProps = {
  isFetching: boolean
}

const SmallLoading: React.FC<ISmallLoadingProps> = ({ isFetching }) => {
  const theme = useTheme()

  if (!isFetching) {
    return null
  }

  return (
    <View
      style={{
        padding: 12,
      }}
    >
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  )
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
      const newData = (await fetchMoreData(localData.map((e) => e.id)))
        .filter((e) => !localData.find((l) => l.id === e.id))
      const newLocalData = [...localData, ...newData]
      // if (newLocalData.length > 25) {
      //   newLocalData = newLocalData.slice(newLocalData.length - 25)
      // }
      setLocalData(newLocalData)
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
        // const wait = new Promise((resolve) => setTimeout(resolve, 0))
        // await wait
        listRef.current?.scrollToIndex({
          index,
          animated: false,
        })
      }}
      ListFooterComponent={<SmallLoading isFetching={isFetching} />}
    />
  )
}

export default CustomList
