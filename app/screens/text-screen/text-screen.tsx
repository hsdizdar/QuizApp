/* eslint-disable react-native/no-inline-styles */
import React, { FunctionComponent } from "react"
import LinearGradient from "react-native-linear-gradient"

export const TextScreen: FunctionComponent = () => (
  <LinearGradient
    colors={["#005BEA", "#00C6FB"]}
    style={{ flex: 1, borderRadius: 20 }}
  ></LinearGradient>
)
