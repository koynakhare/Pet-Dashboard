import { buildQuizRound } from '@/features/game/buildQuizRound'
import type { GameState, GameStats, QuizQuestion } from '@/features/game/gameTypes'
import { selectPets } from '@/features/pets/petsSelectors'
import { useAppSelector } from '@/redux/hooks'
import { LOCAL_STORAGE_KEYS } from '@/utils/constants/storageKeys'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function readStats(): GameStats {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.PET_QUIZ_STATS)
    if (raw) {
      const parsed = JSON.parse(raw) as GameStats
      if (
        typeof parsed.gamesPlayed === 'number' &&
        typeof parsed.totalScore === 'number' &&
        typeof parsed.bestScore === 'number' &&
        typeof parsed.averageScore === 'number'
      ) {
        return parsed
      }
    }
  } catch {
    /* ignore */
  }
  return {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0,
  }
}

function persistStats(score: number): { previousBest: number } {
  const prior = readStats()
  const previousBest = prior.bestScore
  const gamesPlayed = prior.gamesPlayed + 1
  const totalScore = prior.totalScore + score
  const bestScore = Math.max(prior.bestScore, score)
  const averageScore = totalScore / gamesPlayed
  const next: GameStats = {
    gamesPlayed,
    totalScore,
    bestScore,
    averageScore,
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PET_QUIZ_STATS, JSON.stringify(next))
  } catch {
    /* quota / private mode */
  }
  return { previousBest }
}

export function useQuizGame() {
  const allPets = useAppSelector(selectPets)
  const [roundKey, setRoundKey] = useState(0)
  const [session, setSession] = useState<GameState | null>(null)
  const [statsVersion, setStatsVersion] = useState(0)
  const [beatPreviousBest, setBeatPreviousBest] = useState(false)
  const sessionRef = useRef<GameState | null>(null)

  const template = useMemo(() => buildQuizRound(allPets), [allPets, roundKey])

  useEffect(() => {
    sessionRef.current = session
  }, [session])

  useEffect(() => {
    if (template.length === 0) {
      setSession(null)
      return
    }
    setBeatPreviousBest(false)
    const nextSession: GameState = {
      questions: template.map(
        (q): QuizQuestion => ({
          ...q,
          options: [...q.options],
        }),
      ),
      currentQuestionIndex: 0,
      score: 0,
      isComplete: false,
      totalQuestions: template.length,
    }
    setSession(nextSession)
  }, [template])

  const stats = useMemo(() => readStats(), [statsVersion, session?.isComplete])

  const currentQuestion = session ? (session.questions[session.currentQuestionIndex] ?? null) : null

  const answerQuestion = useCallback((answer: string) => {
    setSession((prev) => {
      if (!prev || prev.isComplete) return prev
      const q = prev.questions[prev.currentQuestionIndex]
      if (!q || q.selectedAnswer != null) return prev
      const isCorrect = answer === q.correctPet.title
      const questions = [...prev.questions]
      questions[prev.currentQuestionIndex] = {
        ...q,
        selectedAnswer: answer,
        isCorrect,
      }
      return {
        ...prev,
        questions,
        score: prev.score + (isCorrect ? 1 : 0),
      }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    const prev = sessionRef.current
    if (!prev || prev.isComplete) return
    const q = prev.questions[prev.currentQuestionIndex]
    if (!q?.selectedAnswer) return

    const nextIndex = prev.currentQuestionIndex + 1
    if (nextIndex >= prev.totalQuestions) {
      const { previousBest } = persistStats(prev.score)
      setBeatPreviousBest(prev.score > previousBest)
      setStatsVersion((v) => v + 1)
      setSession({
        ...prev,
        currentQuestionIndex: nextIndex,
        isComplete: true,
      })
      return
    }
    setSession({
      ...prev,
      currentQuestionIndex: nextIndex,
    })
  }, [])

  const restartGame = useCallback(() => {
    setBeatPreviousBest(false)
    setRoundKey((k) => k + 1)
  }, [])

  return {
    session,
    currentQuestion,
    answerQuestion,
    nextQuestion,
    restartGame,
    stats,
    beatPreviousBest,
    canPlay: template.length > 0,
  }
}
