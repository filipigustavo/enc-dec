import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import MD5 from 'crypto-js/md5'

const useEncrypter = () => {
  const [hashs, setHashs] = useState<TKey[]>([])

  const handleOrder = (hashs: TKey[]) => {
    return hashs
  }

  useEffect(() => {
    const keys = ['nq', 'be', 'vt', 'xo', 'rp']
    const initialHash = uuidv4()
    const p = (initialHash.split('-')).map((item, index) => {
      const encrypted = MD5(item).toString();
      return { [keys[index]]: encrypted }
    })

    setHashs(p)
  }, [])

  return {hashs, handleOrder}
}

export default useEncrypter
