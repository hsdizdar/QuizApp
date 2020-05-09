/* eslint-disable react-native/no-inline-styles */
import React, { FunctionComponent, useState } from "react"
import LinearGradient from "react-native-linear-gradient"
import { TouchableOpacity, Text } from "react-native"

export const TextScreen: FunctionComponent = () => {
  const [count, setCount] = useState(0)
  return (
    <LinearGradient
      colors={["#005BEA", "#00C6FB"]}
      style={{ flex: 1, borderRadius: 20, padding: 20 }}
    >
      <Text>{count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>+</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}
