import type { QuizQuestion } from '@/features/game/gameTypes'
import type { Pet } from '@/features/pets/petsTypes'

export const QUIZ_QUESTIONS_PER_ROUND = 5
export const QUIZ_OPTIONS_PER_QUESTION = 3

export function shuffleArray<T>(array: T[]): T[] {
  const next = [...array]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = next[i] as T
    const b = next[j] as T
    next[i] = b
    next[j] = a
  }
  return next
}

function pickWrongTitles(correct: Pet, all: Pet[], need: number): string[] {
  const candidates = shuffleArray(all.filter((p) => p.id !== correct.id))
  const titles: string[] = []
  const seen = new Set<string>()

  for (const p of candidates) {
    if (titles.length >= need) break
    if (p.title === correct.title) continue
    if (seen.has(p.title)) continue
    seen.add(p.title)
    titles.push(p.title)
  }

  if (titles.length < need) {
    for (const p of candidates) {
      if (titles.length >= need) break
      if (p.title === correct.title) continue
      titles.push(p.title)
    }
  }

  return titles.slice(0, need)
}

export function buildQuizRound(pets: Pet[]): QuizQuestion[] {
  if (pets.length < QUIZ_OPTIONS_PER_QUESTION) {
    return []
  }

  const questionCount = Math.min(QUIZ_QUESTIONS_PER_ROUND, pets.length)
  const shuffled = shuffleArray(pets)
  const questionPets = shuffled.slice(0, questionCount)

  return questionPets.map((correctPet) => {
    const wrongTitles = pickWrongTitles(correctPet, pets, QUIZ_OPTIONS_PER_QUESTION - 1)
    const options = shuffleArray([correctPet.title, ...wrongTitles]).slice(
      0,
      QUIZ_OPTIONS_PER_QUESTION,
    )

    return {
      correctPet: {
        id: correctPet.id,
        title: correctPet.title,
        description: correctPet.description,
        url: correctPet.url,
      },
      options,
      selectedAnswer: null,
      isCorrect: null,
    }
  })
}
