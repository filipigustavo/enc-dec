import { useEffect, useMemo, useState } from 'react'

import HashGenerator from './HashGenerator'
import { getKey, testKey } from './helpers'

const useHash: TUseHash = ({
  globalPrefix = 'ed',
  prefix = '',
  Generator = HashGenerator,
  notAllowedKeyCallback = (err: Error) => globalThis.alert(err)
}) => {
  const [secKey, setSecKey] = useState<string>('')
  const security: string = getKey({ globalPrefix, prefix, key:"security" })
  const HGen = useMemo(() => new Generator(security), [security, Generator])
  const localHashs: string | null = globalThis.localStorage.getItem(security)
  const index: string = getKey({ globalPrefix, prefix, key: "index" })
  
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

  const enc: TEnc = (key, value) => {
    try {
      testKey(key)
      HGen.handleEncrypt(getKey({ globalPrefix, prefix, key }), value, secKey)
      HGen.handleSaveKeyIntoIndex(getKey({ globalPrefix, prefix, key: "index" }), key)
    } catch(err) {
      notAllowedKeyCallback(err)
    }
  }

  const dec: TDec = (key) => {
    try {
      testKey(key)
      return HGen.handleDecrypt(getKey({ globalPrefix, prefix, key }), secKey)
    } catch(err) {
      notAllowedKeyCallback(err)
    }
  }

  const remove: TRemove = (key) => {
    try {
      testKey(key)
      HGen.handleRemove(getKey({ globalPrefix, prefix, key }))
      HGen.handleRemoveKeyFromIndex(getKey({ globalPrefix, prefix, key: "index" }), key)
    } catch (err) {
      notAllowedKeyCallback(err)
    }
  }

  return { index, enc, dec, remove }
}

export default useHash
