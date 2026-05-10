export type QuizQuestion = {
  correctPet: {
    id: number
    title: string
    description: string
    url: string
  }
  options: string[]
  selectedAnswer: string | null
  isCorrect: boolean | null
}

export type GameState = {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  score: number
  isComplete: boolean
  totalQuestions: number
}

export type GameStats = {
  gamesPlayed: number
  totalScore: number
  bestScore: number
  averageScore: number
}
