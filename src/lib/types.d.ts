type THashKeys = {
    [key: string]: string
}

type TEnc = (key: string, value: string) => void

type TDec = (key: string) => string

interface TUseHashResult {
  enc: TEnc
  dec: TDec
}

type TUseHash = (prefix?: string, Generator?: AbstractGenerator) => TUseHashResult

type TGenerateHashParts = () => THashKeys

type THandleHash = (localhashs?: THashKeys | null) => string

type THandleEncrypt = (key: string, value: any, passPhrase: string) => void

type THandleDecrypt = (key: string, passPhrase: string) => string
