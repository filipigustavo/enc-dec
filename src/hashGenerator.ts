import { v4 as uuidv4 } from 'uuid'
import * as CryptoJS from 'crypto-js'
import { faker } from '@faker-js/faker'

const generateHashParts = (): TKey => {
  const keys: string[] = faker.lorem.words(5).split(' ')
  const initialHash: string = uuidv4()
  const hashs: TKey = {}
  
  initialHash
    .split('-')
    .forEach((item: string, index: number) => {
      hashs[keys[index]] = CryptoJS.MD5(item).toString()
    })

  localStorage.setItem('security', JSON.stringify(hashs))

  return hashs
}

const handleHash = (localhashs: TKey | null = null): string => {
  const hashs = localhashs || generateHashParts()
  const keys: string[] = Object.keys(hashs)
  const values: string[] = keys.map((item) => hashs[item])
  const sortedValues: string[] = values.sort()
  const key: string = sortedValues.join('')

  return key
}

const handleEncrypt = (key: string, value: any, passPhrase: string): void => {
  const encrypted = CryptoJS.AES.encrypt(value, passPhrase).toString()

  localStorage.setItem(key, encrypted)
}

const handleDecrypt = (key: string, passPhrase:string): string => {
  const encrypted = localStorage.getItem(key) || ''
  const decrypted = CryptoJS.AES.decrypt(encrypted, passPhrase).toString(CryptoJS.enc.Utf8)
  
  return decrypted
}

export { generateHashParts, handleHash, handleEncrypt, handleDecrypt }
