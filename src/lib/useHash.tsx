import { useEffect, useMemo, useState } from 'react'

import HashGenerator from './HashGenerator'
import { getKey } from './helpers'

const useHash: TUseHash = ({ globalPrefix = 'ed', prefix = '', Generator = HashGenerator }) => {
  const [secKey, setSecKey] = useState<string>('')
  const security: string = getKey({ globalPrefix, prefix, key:"security" })
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

  const enc: TEnc = (key, value) => HGen.handleEncrypt(getKey({ globalPrefix, prefix, key }), value, secKey)

  const dec: TDec = (key) => HGen.handleDecrypt(getKey({ globalPrefix, prefix, key }), secKey)

  return { enc, dec }
}

export default useHash
