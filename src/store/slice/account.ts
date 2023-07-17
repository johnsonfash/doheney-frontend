import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '..'
import CONST from '../../lib/constants'
import { saveToken } from '../../lib/token'

export interface AccountData {
  id?: number
  email?: string
  name?: string
  auth?: 'google' | 'manual'
  created_at?: string
}

export interface AccountState extends RequestHookType {
  data?: AccountData | null;
}

const initialState: AccountState = {
  error: false,
  loading: false,
  message: null,
  data: null
}

export const login = createAsyncThunk<API_RESPONSE, any, { state: RootState }>('/account/login', async ({ url, data }: { url: 'google' | 'manual', data: { [key: string]: any } }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${CONST.BASE_URL}${url === 'google' ? CONST.GOOGLE_LOGIN_URL : CONST.MANUAL_LOGIN_URL}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }) as { data: API_RESPONSE<{ user: AccountData, access_token: string }> };
    if (res.data?.status) {
      saveToken(res.data?.data?.access_token)
      return { data: res.data.data?.user, status: res.data.status }
    } else {
      // can only reject with string message
      return rejectWithValue(res.data?.message)
    }
  } catch (e: any) {
    return rejectWithValue(e?.response?.data ? e?.response?.data?.message : e.message)
  }
}, {
  // this is optional, just to check that request do not run more than once when loading
  condition: (_: any, { getState }): boolean => {
    const { account } = getState();
    if (account.loading) {
      return false
    } else {
      return true
    }
  }
});

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateAccount: (state: AccountState, action: PayloadAction<AccountState>) => {
      console.log('me - payload', action.payload)

      state.data = action.payload.data || state.data
      state.loading = action.payload.loading || false
      state.error = action.payload.error || false
      state.message = action.payload.message || null
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state: AccountState) => {
      state.loading = true
    })
      .addCase(login.fulfilled, (state: AccountState, action: PayloadAction<API_RESPONSE>) => {
        console.log('payload', action.payload)
        state.loading = false
        state.error = false
        state.message = ''
        state.data = action.payload.data || null
      })
      .addCase(login.rejected, (state: AccountState, action: PayloadAction<any>) => {
        state.loading = false
        state.error = true
        state.message = action.payload || ''
      })
  }
})

export const { updateAccount } = accountSlice.actions

export default accountSlice.reducer