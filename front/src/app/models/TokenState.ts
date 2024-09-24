import { AccessToken } from "./AccessToken";

export interface TokenStoreState {
  token: AccessToken | null;  
  setToken: (token: AccessToken) => void;
  clearToken: () => void;
}