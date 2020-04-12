/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { SafeAreaView, StatusBar, Text, View, Dimensions, TextStyle } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { observer } from "mobx-react-lite"
import { QuestionStoreContext } from "../../models/root-store/question-save-store"
import { PhotoScreen } from "../photo-screen/photo-screen"
import { TextScreen } from "../text-screen/text-screen"
import { QuizScreen } from "../quiz-screen/quiz-screen"

const CarouselText: TextStyle = {
  color: "#fff",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: 14,
  alignItems: "center",
  textAlign: "center",
}

export interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = observer(props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(), [props.navigation])
  const windowWidth = Dimensions.get("window").width
  const questionStore = React.useContext(QuestionStoreContext)
  const entries = [
    {
      id: 1,
      title: "photo",
    },
    {
      id: 2,
      title: "text",
    },
    {
      id: 3,
      title: "quiz",
    },
  ]

  const [activeSlide, setActiveSlide] = React.useState(0)

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {item.title === "photo" ? (
          <PhotoScreen />
        ) : item.title === "text" ? (
          <TextScreen />
        ) : (
          <QuizScreen />
        )}
        <View
          style={{
            marginTop: 30,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.title === "photo" ? (
            <Text style={CarouselText}>PHOTO</Text>
          ) : item.title === "text" ? (
            <Text style={CarouselText}>TEXT</Text>
          ) : (
            <Text style={CarouselText}>QUIZ</Text>
          )}
          <View
            style={{
              position: "absolute",
              right: 30,
              width: 44,
              height: 44,
              borderRadius: 50,
              backgroundColor: "#FFCC00",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{questionStore.questionCount}</Text>
          </View>
        </View>
      </View>
    )
  }

  const pagination = () => {
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "white" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "white",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <Carousel
        data={entries}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveSlide(index)}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    </SafeAreaView>
  )
})
