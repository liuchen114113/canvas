export interface IApi {
  url: string
  method?: string
}

export interface IResponse {
  code: string
  data?: any
}

export interface IMutableRefObject<T> {
  readonly current: T | null
}
