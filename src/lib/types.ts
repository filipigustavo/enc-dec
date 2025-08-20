import AbstractGenerator from "./AbstractGenerator"

export type THashKeys = {
  [key: string]: string
}

export type TEnc = (key: string, value: string) => void

export type TDec = (key: string) => string

export type TRemove = (key: string) => void

export type TRenew = () => void

export type TClear = () => void

export type TUseHashResult = {
  index: string
  enc: TEnc
  dec: TDec
  remove: TRemove
  renew: TRenew
  clear: TClear
}

export type TUseHashParams<H> = {
  globalPrefix?: string,
  prefix?: string,
  Generator?: new (security: string) => AbstractGenerator<H>,
  notAllowedKeyCallback?: Function
}

export type TUseHash = <H>(params: TUseHashParams<H>) => TUseHashResult

export type TGenerateHashParts<H> = () => H

export type THandleHash<H> = (localhashs: H) => string

export type THandleEncrypt = (key: string, value: any, passPhrase: string) => void

export type THandleDecrypt = (key: string, passPhrase: string) => string

export type THandleRemove = (key: string) => void

export type THandleSaveKeyIntoIndex = (index: string, key: string) => void

export type THandleRemoveKeyFromIndex = (index: string, key: string) => void

export type TGetKey = (params:{ globalPrefix?: string, prefix?: string, key: string }) => string