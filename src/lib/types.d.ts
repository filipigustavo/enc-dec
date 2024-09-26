type THashKeys = {
  [key: string]: string
}

type TEnc = (key: string, value: string) => void

type TDec = (key: string) => string

interface TUseHashResult {
  enc: TEnc
  dec: TDec
}

type TUseHash = (params: { globalPrefix?: string, prefix?: string, Generator?: AbstractGenerator, notAllowedKeyCallback?: Function }) => TUseHashResult

type TGenerateHashParts<H> = () => H

type THandleHash<H> = (localhashs: H) => string

type THandleEncrypt = (key: string, value: any, passPhrase: string) => void

type THandleDecrypt = (key: string, passPhrase: string) => string

type THandleSaveKeyIntoIndex = (index: string, key: string) => void

type TGetKey = (params:{ globalPrefix?: string, prefix?: string, key: string }) => string