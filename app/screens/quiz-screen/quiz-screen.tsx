/* eslint-disable react-native/no-single-element-style-arrays */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-key */
import * as React from "react"
import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native"
import { Icon } from "../../components/icon/icon"
import LinearGradient from "react-native-linear-gradient"
import { color, spacing } from "../../theme"
import { observer } from "mobx-react-lite"
import { QuestionStoreContext } from "../../models/root-store/question-save-store"

const ICONCONTAINERVIEW: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "flex-start",
  marginBottom: 20,
}
const ICONVIEW: ViewStyle = {
  width: 44,
  height: 44,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
}
const ICON: TextStyle = {
  color: "#FFFFFF",
  fontSize: 24,
  fontWeight: "bold",
  alignSelf: "center",
}
const QUESTIONINPUT: TextStyle = {
  display: "flex",
  justifyContent: "center",
  alignSelf: "center",
  backgroundColor: color.transparent,
  width: 315,
  height: 80,
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: 24,
  lineHeight: 29,
  textAlign: "center",
  color: "#FFFFFF",
  marginBottom: 30,
}
const OPTIONVIEWSTYLE: ViewStyle = {
  width: 32,
  height: 32,
  backgroundColor: "#ffffff",
  borderRadius: 50,
  justifyContent: "center",
  alignContent: "center",
  marginLeft: 20,
  marginRight: 10,
}
const OPTIONSTYLE: TextStyle = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: 16,
  color: "#007AFF",
  textAlign: "center",
}
const NEWOPTIONVIEWSTYLE: ViewStyle = {
  flexDirection: "row",
  width: 310,
  height: 55,
  backgroundColor: "transparent",
  borderWidth: 1,
  borderRadius: 40,
  borderStyle: "dashed",
  borderColor: "white",
  justifyContent: "flex-start",
  alignItems: "center",
}
const NEWOPTIONSTYLE: ViewStyle = {
  width: 32,
  height: 32,
  backgroundColor: "transparent",
  borderRadius: 50,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: "white",
  justifyContent: "center",
  alignContent: "center",
  marginLeft: 20,
  marginRight: 20,
}
const NEWOPTIONTEXTSTYLE: TextStyle = {
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 16,
  color: "rgba(255, 255, 255, 0.3)",
  textAlign: "center",
}

export const QuizScreen: React.FunctionComponent<{}> = observer(() => {
  const questionStore = React.useContext(QuestionStoreContext)
  const options = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  }
  const [question, setQuestion] = React.useState<string>("")
  const [answerButtons, setAnswerButtons] = React.useState([])
  const [isCheck, setCheck] = React.useState<boolean>(false)
  const [isAnimationCheck, setAnimationCheck] = React.useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)

  const animation = () => {
    const opacity = new Animated.Value(0)

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
    }).start()

    return opacity
  }

  const getOption = (index: number) => options[index]

  const changeAnswer = (index: number, text: string) => {
    console.log(answerButtons[index].answer)

    answerButtons[index].answer += text
  }

  const setCorrectOption = (index: number) => {
    setCheck(true)
    setAnimationCheck(true)
    setSelectedIndex(index)
  }

  const saveQuestion = () => {
    if (
      question &&
      answerButtons.length === 4 &&
      answerButtons &&
      answerButtons[selectedIndex].answer
    ) {
      questionStore.saveQuestions(question)
      questionStore.saveCorrectAnswer(answerButtons[selectedIndex].answer)
      questionStore.saveAnswers(answerButtons)
      setQuestion("")
      setAnswerButtons([])
      setCheck(false)
      setSelectedIndex(-1)
    } else {
      Alert.alert(
        "Warning !",
        "Please, fill in the fields.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    }
  }

  return (
    <LinearGradient colors={["#005BEA", "#00C6FB"]} style={{ flex: 1, borderRadius: 30 }}>
      <View style={ICONCONTAINERVIEW}>
        <View style={ICONVIEW}>
          <Text style={ICON}>?</Text>
        </View>
        <View style={ICONVIEW}>
          <Text style={ICON}>x</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TextInput
          style={QUESTIONINPUT}
          placeholder={"Tap to begin typing your \nquestion"}
          placeholderTextColor="#FFFFFF"
          onChangeText={text => {
            setAnimationCheck(false)
            setQuestion(text)
          }}
          value={question}
          multiline={true}
          numberOfLines={2}
          underlineColorAndroid="transparent"
        />
        {answerButtons.map((button, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setCorrectOption(index)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: isCheck && index === selectedIndex ? "#36C759" : "transparent",
                  flexDirection: "row",
                  width: 310,
                  height: 55,
                  borderWidth: 1,
                  borderRadius: 40,
                  borderStyle: "solid",
                  borderColor: isCheck && index === selectedIndex ? "#36C759" : "#fff",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  opacity: isCheck && index === selectedIndex && isAnimationCheck ? animation() : 1,
                }}
              >
                <View style={OPTIONVIEWSTYLE}>
                  {isCheck && index === selectedIndex ? (
                    <Icon
                      icon="greenTick"
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    />
                  ) : (
                    <Text style={OPTIONSTYLE}>{getOption(index)}</Text>
                  )}
                </View>
                <TextInput
                  placeholder={`Option ${index + 1}`}
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  style={{
                    width: 220,
                    height: 50,
                    backgroundColor: "transparent",
                    color: "white",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: 16,
                  }}
                  onChangeText={text => changeAnswer(index, text)}
                />
              </Animated.View>
            </TouchableOpacity>
          )
        })}
        {answerButtons.length < 4 ? (
          <TouchableOpacity
            onPress={() => {
              setAnimationCheck(false)
              setAnswerButtons([...answerButtons, { answer: "" }])
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={NEWOPTIONVIEWSTYLE}>
              <View style={NEWOPTIONSTYLE}></View>
              <Text style={NEWOPTIONTEXTSTYLE}>Add New Option</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() =>
          answerButtons.length === 4 && answerButtons && question ? saveQuestion() : null
        }
        style={{
          position: "absolute",
          bottom: 30,
          backgroundColor:
            answerButtons.length === 4 && answerButtons && question ? "#FF2D55" : "#E5E5EA",
          width: 64,
          height: 64,
          borderRadius: 50,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Icon
          icon="tick"
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </LinearGradient>
  )
})
