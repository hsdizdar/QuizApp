import { observable, action } from "mobx"
import { createContext } from "react"

class QuestionStore {
  @observable answers = []
  @observable correctAnswer = ""
  @observable questions = []
  @observable questionCount = 0

  @action saveQuestions(item) {
    this.questions.push(item)
    this.questionCount += 1
    console.log("saveQuestion")
  }

  @action saveAnswers(item) {
    this.answers.push(item)
    console.log("saveAnswers")
  }

  @action saveCorrectAnswer(item) {
    this.correctAnswer = item
    console.log("saveCorrectAnswer")
  }
}

export const QuestionStoreContext = createContext(new QuestionStore())
