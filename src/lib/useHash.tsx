import { useEffect, useMemo, useState } from 'react'

import HashGenerator from './HashGenerator'
import { getKey, testKey } from './helpers'
import { TDec, TEnc, TRemove, TRenew, TUseHash } from './types'
import AbstractGenerator from './AbstractGenerator'

const useHash: TUseHash = ({
  globalPrefix = 'ed',
  prefix = '',
  Generator = HashGenerator,
  notAllowedKeyCallback = (err: Error) => globalThis.alert(err)
}) => {
  const [secKey, setSecKey] = useState<string>('')
  const security: string = getKey({ globalPrefix, prefix, key:"security" })
  const HGen: AbstractGenerator<any> = useMemo(() => new Generator(security), [security, Generator])
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
      HGen.handleSaveKeyIntoIndex(index, key)
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
      return ""
    }
  }

  const remove: TRemove = (key) => {
    try {
      testKey(key)
      HGen.handleRemove(getKey({ globalPrefix, prefix, key }))
      HGen.handleRemoveKeyFromIndex(index, key)
    } catch (err) {
      notAllowedKeyCallback(err)
    }
  }

  const renew: TRenew = () => {
    const parsedCurrentHashs = JSON.parse(localHashs || "")
    const currentKey = HGen.handleHash(parsedCurrentHashs)
    const newHashs = HGen.generateHashParts()
    const newKey: string = HGen.handleHash(newHashs)
    const indexData: string[] = JSON.parse(globalThis.localStorage.getItem(index) || "[]")

    indexData.forEach((key: string) => {
      const itemKey = getKey({ globalPrefix, prefix, key })
      const decryptedValue = HGen.handleDecrypt(itemKey, currentKey)

      HGen.handleEncrypt(itemKey, decryptedValue, newKey)
    })

    HGen.persistData(newHashs)

    setSecKey(newKey)
  }

  const clear = () => {
    const indexData: string[] = JSON.parse(globalThis.localStorage.getItem(index) || "[]")

    indexData.forEach((key: string) => {
      HGen.handleRemove(getKey({ globalPrefix, prefix, key }))
      HGen.handleRemoveKeyFromIndex(index, key)
    })
  }

  return { index, enc, dec, remove, renew, clear }
}

export default useHash
