import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import trim from 'lodash/trim'
import { memo, useCallback, useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/redux/hooks'
import { setCredentials } from '@/redux/slices/authSlice'
import { RoutePath } from '@/utils/enums/routePath'
import './LoginForm.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REMEMBER_KEY = 'pet-gallery:login-email'

type FieldErrors = {
  email?: string
  password?: string
}

function validate(email: string, password: string): FieldErrors {
  const next: FieldErrors = {}
  if (!email) {
    next.email = 'Email is required'
  } else if (!EMAIL_RE.test(email)) {
    next.email = 'Enter a valid email address'
  }
  if (!password) {
    next.password = 'Password is required'
  } else if (password.length < 8) {
    next.password = 'Use at least 8 characters'
  }
  return next
}

function LoginFormComponent() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem(REMEMBER_KEY) ?? ''
    } catch {
      return ''
    }
  })
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => {
    try {
      return Boolean(localStorage.getItem(REMEMBER_KEY))
    } catch {
      return false
    }
  })
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const cleanEmail = trim(email)
      const cleanPassword = trim(password)
      const errors = validate(cleanEmail, cleanPassword)
      setFieldErrors(errors)
      if (Object.keys(errors).length > 0) {
        return
      }

      setIsSubmitting(true)
      try {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 850)
        })

        const token = `demo-token-${globalThis.crypto?.randomUUID?.() ?? String(Date.now())}`
        dispatch(setCredentials({ token }))

        try {
          if (remember) {
            localStorage.setItem(REMEMBER_KEY, cleanEmail)
          } else {
            localStorage.removeItem(REMEMBER_KEY)
          }
        } catch {
          /* ignore */
        }

        toast.success('Welcome back — session secured.')
        navigate(RoutePath.Dashboard, { replace: true })
      } finally {
        setIsSubmitting(false)
      }
    },
    [dispatch, email, navigate, password, remember],
  )

  const toggleVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const handleForgot = useCallback(() => {
    toast('Password reset is not wired in this demo.', { icon: '🔐' })
  }, [])

  return (
    <form className="auth-login-form" onSubmit={handleSubmit} noValidate>
      <TextField
        fullWidth
        autoComplete="email"
        type="email"
        label="Work email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: undefined }))
          }
        }}
        error={Boolean(fieldErrors.email)}
        helperText={fieldErrors.email}
        disabled={isSubmitting}
        className="auth-login-field"
        InputProps={{
          className: 'auth-login-input',
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineRoundedIcon className="auth-login-input-icon" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        autoComplete="current-password"
        type={showPassword ? 'text' : 'password'}
        label="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          if (fieldErrors.password) {
            setFieldErrors((prev) => ({ ...prev, password: undefined }))
          }
        }}
        error={Boolean(fieldErrors.password)}
        helperText={fieldErrors.password}
        disabled={isSubmitting}
        className="auth-login-field"
        InputProps={{
          className: 'auth-login-input',
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon className="auth-login-input-icon" fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                onClick={toggleVisibility}
                edge="end"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="auth-login-visibility"
                disabled={isSubmitting}
              >
                {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div className="auth-login-row">
        <FormControlLabel
          className="auth-login-remember"
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isSubmitting}
            />
          }
          label="Remember me"
        />
        <Button
          type="button"
          variant="text"
          className="auth-login-forgot"
          onClick={handleForgot}
          disabled={isSubmitting}
        >
          Forgot password?
        </Button>
      </div>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isSubmitting}
        className="auth-login-submit"
        startIcon={
          isSubmitting ? (
            <CircularProgress size={20} className="auth-login-submit-spinner" />
          ) : (
            <LoginRoundedIcon />
          )
        }
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <Typography component="p" variant="body2" className="auth-login-hint">
        Demo mode issues a bearer token so protected routes and interceptors can be tested.
      </Typography>
    </form>
  )
}

export const LoginForm = memo(LoginFormComponent)
