import WebView from 'react-native-webview'
import { Share } from 'react-native'
import { useLayoutEffect } from 'react'
import { Button } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'

const RecipeWebView = ({ navigation, route}) => {
  const { url } = route.params

  const handleShare = async () => {
    try {
      await Share.share({
        content: { url: url },
        message: `Sharing ${url}`
      })
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button type='clear' onPress={handleShare}>
          <Ionicons name='share-outline' size={20} />
        </Button>
      )
    })
    return () => {}
  }, [navigation])

  return <WebView source={{ uri: url }} />
}

export default RecipeWebView
