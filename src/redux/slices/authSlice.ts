import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/rootReducer'
import { STORAGE_KEYS } from '@/utils/constants/storageKeys'

type AuthState = {
  token: string | null
}

function readTokenFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  } catch {
    return null
  }
}

const initialState: AuthState = {
  token: readTokenFromStorage(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, action.payload.token)
      } catch {
        /* storage may be unavailable in private mode */
      }
    },
    logout(state) {
      state.token = null
      try {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      } catch {
        /* ignore */
      }
    },
  },
})

export const { logout, setCredentials } = authSlice.actions
export const authReducer = authSlice.reducer

export function selectAuthToken(state: RootState): string | null {
  return state.auth.token
}

export function selectIsAuthenticated(state: RootState): boolean {
  return Boolean(state.auth.token)
}
