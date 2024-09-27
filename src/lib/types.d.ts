type THashKeys = {
  [key: string]: string
}

type TEnc = (key: string, value: string) => void

type TDec = (key: string) => string

type TRemove = (key: string) => void

type TRenew = () => void

type TClear = () => void

interface TUseHashResult {
  index: string
  enc: TEnc
  dec: TDec
  remove: TRemove
  renew: TRenew
  clear: TClear
}

type TUseHashParams = {
  globalPrefix?: string,
  prefix?: string,
  Generator?: AbstractGenerator,
  notAllowedKeyCallback?: Function
}

type TUseHash = (params: TUseHashParams) => TUseHashResult

type TGenerateHashParts<H> = () => H

type THandleHash<H> = (localhashs: H) => string

type THandleEncrypt = (key: string, value: any, passPhrase: string) => void

type THandleDecrypt = (key: string, passPhrase: string) => string

type THandleRemove = (key: string) => void

type THandleSaveKeyIntoIndex = (index: string, key: string) => void

type THandleRemoveKeyFromIndex = (index: string, key: string) => void

type TGetKey = (params:{ globalPrefix?: string, prefix?: string, key: string }) => string