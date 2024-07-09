import { View } from "react-native";
import EmailLogin from "@/components/Auth/EmailLogin";
import {Button} from "react-native-paper";
import { useRouter } from "expo-router";

export default function LoginPage () {
  const router = useRouter()

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        justifyContent: 'center'
      }}
    >
      <Button
        icon="email"
        mode="contained"
        onPress={() => router.push('/emailLogin')}
      >
        Zaloguj się przez email
      </Button>
    </View>
  )
}
