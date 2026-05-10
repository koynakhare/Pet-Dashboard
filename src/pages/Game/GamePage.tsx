import { PetErrorState } from '@/features/pets/components/PetStates'
import { usePets } from '@/hooks/usePets'
import { useQuizGame } from '@/hooks/useQuizGame'
import { RoutePath } from '@/utils/enums/routePath'
import { optimizeImageUrl } from '@/utils/imageOptimizer'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import {
  Box,
  Button,
  CardMedia,
  Chip,
  CircularProgress,
  Fade,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './GamePage.css'

export default function GamePage() {
  const navigate = useNavigate()
  const petsData = usePets()
  const {
    session,
    currentQuestion,
    answerQuestion,
    nextQuestion,
    restartGame,
    stats,
    beatPreviousBest,
    canPlay,
  } = useQuizGame()

  const imageSrc = useMemo(() => {
    if (!currentQuestion) return ''
    return optimizeImageUrl(currentQuestion.correctPet.url, 'card')
  }, [currentQuestion])

  if (petsData.uiStatus === 'error') {
    return (
      <div className="game-page-root anim-fade-in">
        <PetErrorState message={petsData.error ?? 'Unknown error'} onRetry={petsData.retryFetch} />
      </div>
    )
  }

  if (!petsData.hasFetched && (petsData.uiStatus === 'idle' || petsData.uiStatus === 'loading')) {
    return (
      <div className="game-page-loading glass-surface-strong anim-fade-in">
        <CircularProgress aria-label="Loading pets" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading quiz data…
        </Typography>
      </div>
    )
  }

  if (petsData.hasFetched && !canPlay) {
    return (
      <Stack spacing={2} className="game-page-root game-page-empty anim-fade-in">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 800 }}>
          Quiz needs more pets
        </Typography>
        <Typography color="text.secondary">
          The catalog needs at least three pets with distinct options to build a round. Open the
          gallery once data has loaded.
        </Typography>
        <Button variant="contained" onClick={() => navigate(RoutePath.Pets)}>
          Go to gallery
        </Button>
      </Stack>
    )
  }

  if (!session) {
    return (
      <div className="game-page-loading glass-surface-strong anim-fade-in">
        <CircularProgress aria-label="Preparing quiz" />
      </div>
    )
  }

  if (session.isComplete) {
    const total = session.totalQuestions
    const pct = total > 0 ? Math.round((session.score / total) * 100) : 0

    return (
      <div className="game-page-root game-page-results anim-fade-in">
        <Fade in timeout={400}>
          <Box className="game-page-result-card glass-surface-strong">
            <EmojiEventsRoundedIcon className="game-page-result-trophy" aria-hidden />
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: 800, textAlign: 'center' }}
              gutterBottom
            >
              Game complete
            </Typography>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}
            >
              {session.score} / {total}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
              {pct}% correct
            </Typography>

            {beatPreviousBest ? (
              <Chip label="New best score" color="success" sx={{ mb: 2, fontWeight: 700 }} />
            ) : null}

            <Stack spacing={1.25} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography color="text.secondary">Games played</Typography>
                <Typography sx={{ fontWeight: 600 }}>{stats.gamesPlayed}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography color="text.secondary">Best score</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {stats.bestScore} / {total}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Typography color="text.secondary">Average score</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {stats.averageScore.toFixed(1)} / {total}
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RefreshRoundedIcon />}
                onClick={restartGame}
                className="ui-btn ui-btn-primary"
              >
                Play again
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<HomeRoundedIcon />}
                onClick={() => navigate(RoutePath.Home)}
                className="ui-btn ui-btn-outline"
              >
                Back to home
              </Button>
            </Stack>
          </Box>
        </Fade>
      </div>
    )
  }

  if (!currentQuestion) {
    return null
  }

  const answered = currentQuestion.selectedAnswer != null
  const progressPct = ((session.currentQuestionIndex + 1) / session.totalQuestions) * 100

  return (
    <Box className="game-page-root game-page-play anim-fade-in">
      <Stack
        sx={{
          mb: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        <Stack
          spacing={1}
          useFlexGap
          sx={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <SportsEsportsRoundedIcon color="primary" sx={{ fontSize: 32 }} aria-hidden />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 800 }}>
            Pet quiz
          </Typography>
          <Chip label="NEW" size="small" className="game-page-new-badge" />
        </Stack>
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700 }}>
          Score: {session.score} / {session.totalQuestions}
        </Typography>
      </Stack>

      <Box sx={{ mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progressPct}
          sx={{
            height: 10,
            borderRadius: 999,
            '& .MuiLinearProgress-bar': { borderRadius: 999 },
          }}
          aria-label="Quiz progress"
        />
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
          Question {session.currentQuestionIndex + 1} of {session.totalQuestions}
        </Typography>
      </Box>

      <Fade in key={session.currentQuestionIndex} timeout={250}>
        <Box className="game-page-question glass-surface-strong">
          <Typography variant="h6" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
            Who is this?
          </Typography>

          <CardMedia component="img" src={imageSrc} alt="" className="game-page-quiz-image" />

          <Stack spacing={1.25} sx={{ mt: 2 }}>
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = currentQuestion.selectedAnswer === option
              const showResult = answered
              const isCorrectOption = option === currentQuestion.correctPet.title
              const isWrongPick = showResult && isSelected && !isCorrectOption

              let optClass = 'game-page-option'
              if (showResult && isCorrectOption) optClass += ' game-page-option--correct'
              if (isWrongPick) optClass += ' game-page-option--wrong'

              return (
                <Button
                  key={`${session.currentQuestionIndex}-${optIdx}-${option}`}
                  fullWidth
                  variant="outlined"
                  className={optClass}
                  disabled={answered}
                  onClick={() => answerQuestion(option)}
                >
                  {option}
                </Button>
              )
            })}
          </Stack>

          {answered ? (
            <Fade in>
              <Box sx={{ mt: 2.5 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    textAlign: 'center',
                    mb: 1,
                    color: currentQuestion.isCorrect ? 'success.main' : 'error.main',
                  }}
                >
                  {currentQuestion.isCorrect ? 'Correct' : 'Not quite'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mb: 2 }}
                >
                  {currentQuestion.correctPet.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={nextQuestion}
                  className="ui-btn ui-btn-primary"
                >
                  {session.currentQuestionIndex + 1 >= session.totalQuestions
                    ? 'See results'
                    : 'Next question'}
                </Button>
              </Box>
            </Fade>
          ) : null}
        </Box>
      </Fade>
    </Box>
  )
}
