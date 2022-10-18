import { useEffect, useState } from 'react'

import { handleHash, handleEncrypt, handleDecrypt } from './hashGenerator'

const useHash = () => {
  const [secKey, setSecKey] = useState<string>('')

  useEffect(() => {
    const localHashs: string | null = localStorage.getItem('security')

    if (localHashs) {
      const parsedHashs = JSON.parse(localHashs)
      const newKey = handleHash(parsedHashs)

      setSecKey(newKey)
    } else {
      const newKey = handleHash()

      setSecKey(newKey)
    }
  }, [])

  const enc = (key: string, value: string): void => handleEncrypt(key, value, secKey)

  const dec = (key: string): string => handleDecrypt(key, secKey)

  return { enc, dec }
}

export default useHash
