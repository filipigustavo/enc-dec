import { useEffect, useMemo, useState } from 'react'

import HashGenerator from './HashGenerator'

const useHash: TUseHash = (prefix = '', Generator = HashGenerator) => {
  const [secKey, setSecKey] = useState<string>('')
  const security: string = `${prefix}security`
  const HGen = useMemo(() => new Generator(security), [security, Generator])
  const localHashs: string | null = localStorage.getItem(security)
  
  useEffect(() => {
    if (localHashs) {
      const parsedHashs = JSON.parse(localHashs)
      const newKey = HGen.handleHash(parsedHashs)

      setSecKey(newKey)
    } else {
      const parsedHashs = HGen.generateHashParts()
      const newKey: string = HGen.handleHash(parsedHashs)
      
      HGen.persistData(parsedHashs)

      setSecKey(newKey)
    }
  }, [prefix, HGen, localHashs])

  const enc: TEnc = (key, value) => HGen.handleEncrypt(`${prefix}${key}`, value, secKey)

  const dec: TDec = (key) => HGen.handleDecrypt(`${prefix}${key}`, secKey)

  return { enc, dec }
}

export default useHash
