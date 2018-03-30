export interface User {
  email: string,
  password: string,
  name?: string,
  subscribeNews?: boolean,
  role: string,
  id: string,
  provider: string
}
