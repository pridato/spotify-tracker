import {create} from 'zustand'
import { AccessToken } from '../models/AccessToken'
import { TokenStoreState } from '../models/TokenState'

const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  setToken: (token:AccessToken) => set({token}),
  clearToken: () => null,
}))

export default useTokenStore