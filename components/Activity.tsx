import React, { useState } from 'react'
import {
  Dimensions,
  ImageBackground, Linking, SafeAreaView, ScrollView, TouchableOpacity, View,
} from 'react-native'
import {
  Card, Chip, IconButton, Text, useTheme,
} from 'react-native-paper'
import { useToast } from 'react-native-paper-toast'
import { useTranslation } from 'react-i18next'
import { ActivityModel } from '@/models'
import ModalComponent from '@/components/UI/Modal'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useAuth } from '@/context/auth/Auth'
import Tags from '@/components/Tags'

type Props = {
  activity: ActivityModel
}

const Activity: React.FC<Props> = ({ activity }) => {
  const [image, setImage] = useState(activity.images.get(0))
  const [likedByUser, setLikedByUser] = useState(activity.likedByUser)
  const { token } = useAuth()
  const theme = useTheme()
  const toaster = useToast()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component' })

  const trackViewedActivity = async () => {
    await ActivitiesFactory.create(token).getActivityViewsService().trackViewedActivity(activity)
  }

  const openURL = async (url?: string) => {
    try {
      if (!url) {
        return
      }
      await Linking.openURL(url)
    } catch (error) {
      console.error("Couldn't load page", error)
    }
  }

  const likeAction = async () => {
    if (likedByUser) {
      setLikedByUser(false)
      activity.unlike()
      await ActivitiesFactory.create(token).unlikeActivity(activity.id)
      return
    }

    activity.like()
    setLikedByUser(true)
    await ActivitiesFactory.create(token).likeActivity(activity.id)
  }

  const openGoogleMaps = () => {
    const { latitude, longitude } = activity.coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url)
        } else {
          toaster.show({
            message: t('cant_open_google_maps'),
            type: 'error',
          })
        }
      })
      .catch(() => {
        toaster.show({
          message: t('cant_open_google_maps'),
          type: 'error',
        })
      })
  }

  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}
      onTouchStart={trackViewedActivity}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '20%',
          height: '85%',
          zIndex: 1000,
        }}
        onPress={() => setImage(image.prev())}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '20%',
          height: '85%',
          zIndex: 1000,
        }}
        onPress={() => setImage(image.next())}
      />
      <ImageBackground
        source={{ uri: image.value }}
        imageStyle={{
          borderRadius: 15,
          objectFit: 'cover',
        }}
        style={{
          margin: 10,
          flex: 1,
        }}
      >
        <Card
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,.0)',
          }}
          mode="contained"
        >
          <Card.Content>
            <Text
              variant="titleLarge"
              style={{
                fontFamily: 'OpenSans',
                color: 'white',
                fontWeight: 900,
                textDecorationStyle: 'solid',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 0.6,
              }}
            >
              {activity.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <IconButton
                icon="heart"
                size={35}
                iconColor={likedByUser ? 'red' : 'white'}
                containerColor={likedByUser ? 'rgba(50,0,0,.5)' : 'rgba(0,0,0,.5)'}
                onPress={likeAction}
              />
              <IconButton
                icon="comment"
                iconColor="white"
                containerColor="rgba(0,0,0,.5)"
                size={35}
                onPress={() => console.log('comment')}
              />
              <IconButton
                icon="share"
                iconColor="white"
                containerColor="rgba(0,0,0,.5)"
                size={35}
                onPress={() => console.log('share')}
              />

              <IconButton
                icon="map"
                iconColor="white"
                containerColor="rgba(0,0,0,.5)"
                size={35}
                onPress={openGoogleMaps}
              />

              <ModalComponent
                button={(
                  <IconButton
                    icon="information"
                    iconColor="white"
                    containerColor="rgba(0,0,0,.5)"
                    size={35}
                  />
                )}
              >
                <ScrollView
                  style={{
                    maxHeight: Dimensions.get('window').height * 0.7,
                  }}
                >
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: 'OpenSans',
                      color: theme.colors.primary,
                    }}
                  >
                    {activity.name}
                  </Text>

                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: 'OpenSans',
                      marginTop: 20,
                    }}
                  >
                    {activity.description}
                  </Text>

                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: 'OpenSans',
                      marginTop: 10,
                      color: theme.colors.primary,
                    }}
                  >
                    {t('address')}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: 'OpenSans',
                    }}
                  >
                    {activity.address.toString()}
                  </Text>

                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: 'OpenSans',
                      marginTop: 10,
                      color: theme.colors.primary,
                    }}
                  >
                    {t('external_links')}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    {
                      activity.externalLinks.wikipedia ? (
                        <IconButton
                          icon="wikipedia"
                          size={40}
                          iconColor="black"
                          mode="contained"
                          onPress={() => openURL(activity.externalLinks.wikipedia)}
                        />
                      ) : null
                    }
                    {
                      activity.externalLinks.website ? (
                        <IconButton
                          icon="web"
                          size={40}
                          mode="contained"
                          onPress={() => openURL(activity.externalLinks.website)}
                        />
                      ) : null
                    }
                  </View>

                  {
                    activity.tags.length > 0
                      ? <Tags tags={activity.tags} />
                      : null
                  }
                </ScrollView>
              </ModalComponent>
            </View>
          </Card.Content>
        </Card>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Activity
