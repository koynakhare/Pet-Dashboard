import {
  type ActionReducerMapBuilder,
  type AsyncThunk,
  createAsyncThunk,
  type GetThunkAPI,
  type PayloadAction,
} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/utils/errors/errorUtils'

/** Shared async fields for slices that use `createAddCaseHandler` (enterprise-style). */
export interface AsyncSliceFields {
  loading: boolean
  error: string | null
}

export type AsyncCaseHandlers<
  State extends AsyncSliceFields,
  Returned,
> = {
  onPending?: (state: State) => void
  onFulfilled?: (state: State, action: PayloadAction<Returned>) => void
  onRejected?: (state: State, message: string) => void
}

function isAsyncCaseHandlers<
  State extends AsyncSliceFields,
  Returned,
>(
  value: unknown,
): value is AsyncCaseHandlers<State, Returned> {
  if (value === null || typeof value !== 'object') {
    return false
  }
  return (
    'onPending' in value ||
    'onFulfilled' in value ||
    'onRejected' in value
  )
}

export function showSuccessNotification(message: string): void {
  toast.success(message)
}

export function showErrorNotification(message: string): void {
  toast.error(message)
}

export function showInfoNotification(message: string): void {
  toast(message)
}

type GenericThunkConfig<ThunkArg, State> = {
  condition?: (
    arg: ThunkArg,
    api: Pick<
      GetThunkAPI<{ rejectValue: string; state: State }>,
      'getState' | 'extra'
    > & { abort: (reason?: string) => void },
  ) => boolean
}

export function createGenericAsyncThunk<
  Returned,
  ThunkArg = void,
  State = unknown,
>(
  typePrefix: string,
  payloadCreator: (
    arg: ThunkArg,
    thunkApi: GetThunkAPI<{ rejectValue: string; state: State }>,
  ) => Promise<Returned>,
  config?: GenericThunkConfig<ThunkArg, State>,
): AsyncThunk<
  Returned,
  ThunkArg,
  { rejectValue: string; state: State }
> {
  return createAsyncThunk<
    Returned,
    ThunkArg,
    { rejectValue: string; state: State }
  >(
    typePrefix,
    async (arg, thunkApi) => {
      try {
        return await payloadCreator(arg, thunkApi)
      } catch (error: unknown) {
        return thunkApi.rejectWithValue(extractErrorMessage(error))
      }
    },
    config,
  )
}

/**
 * Wires pending / fulfilled / rejected for an async thunk.
 *
 * - Third argument **string** (`assignPayloadTo`): on success, assigns `action.payload` to
 *   `state[assignPayloadTo]` (same pattern as `createAddCaseHandler(builder, action, 'kgList')`).
 * - Third argument **handlers object**: custom `onPending` / `onFulfilled` / `onRejected`.
 * - Omit third argument: only toggles `loading` / `error` (no automatic payload assign).
 */
export function createAddCaseHandler<
  State extends AsyncSliceFields,
  Returned,
  ThunkArg,
  RootSlices,
>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<
    Returned,
    ThunkArg,
    { rejectValue: string; state: RootSlices }
  >,
  assignPayloadTo: keyof State & string,
): void
export function createAddCaseHandler<
  State extends AsyncSliceFields,
  Returned,
  ThunkArg,
  RootSlices,
>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<
    Returned,
    ThunkArg,
    { rejectValue: string; state: RootSlices }
  >,
  handlers?: AsyncCaseHandlers<State, Returned>,
): void
export function createAddCaseHandler<
  State extends AsyncSliceFields,
  Returned,
  ThunkArg,
  RootSlices,
>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: AsyncThunk<
    Returned,
    ThunkArg,
    { rejectValue: string; state: RootSlices }
  >,
  assignOrHandlers?:
    | (keyof State & string)
    | AsyncCaseHandlers<State, Returned>,
): void {
  const assignPayloadTo =
    typeof assignOrHandlers === 'string' ? assignOrHandlers : undefined
  const handlers = isAsyncCaseHandlers<State, Returned>(assignOrHandlers)
    ? assignOrHandlers
    : undefined

  builder
    .addCase(asyncThunk.pending, (state) => {
      state.loading = true
      state.error = null
      handlers?.onPending?.(state as unknown as State)
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      if (assignPayloadTo !== undefined) {
        const key = assignPayloadTo
        ;(state as unknown as Record<string, unknown>)[key] = action.payload
      }
      handlers?.onFulfilled?.(state as unknown as State, action)
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = false
      const message =
        typeof action.payload === 'string' && action.payload.length > 0
          ? action.payload
          : (action.error.message ?? 'Request failed')
      state.error = message
      handlers?.onRejected?.(state as unknown as State, message)
    })
}
