import { View } from "react-native";
import EmailLogin from "@/components/Auth/EmailLogin";

export default function LoginPage () {
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        justifyContent: 'center'
      }}
    >
      <EmailLogin />
    </View>
  )
}
