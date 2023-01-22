import { v4 as uuidv4 } from 'uuid'
import * as CryptoJS from 'crypto-js'
import { faker } from '@faker-js/faker'

import AbstractGenerator from './AbstractGenerator'

class HashGenerator implements AbstractGenerator {
  constructor(private security: string) {}

  generateHashParts: TGenerateHashParts = () => {
    const keys: string[] = faker.lorem.words(5).split(' ')
    const initialHash: string = uuidv4()
    const hashs: THashKeys = {}
    
    initialHash
      .split('-')
      .forEach((item: string, index: number) => {
        hashs[keys[index]] = CryptoJS.MD5(item).toString()
      })

    localStorage.setItem(this.security, JSON.stringify(hashs))

    return hashs
  }

  handleHash: THandleHash = (localhashs = null) => {
    const hashs = localhashs || this.generateHashParts()
    const keys: string[] = Object.keys(hashs)
    const values: string[] = keys.map((item) => hashs[item])
    const sortedValues: string[] = values.sort()
    const key: string = sortedValues.join('')

    return key
  }

  handleEncrypt: THandleEncrypt = (key, value, passPhrase) => {
    const encrypted = CryptoJS.AES.encrypt(value, passPhrase).toString()

    localStorage.setItem(key, encrypted)
  }

  handleDecrypt: THandleDecrypt = (key, passPhrase) => {
    const encrypted = localStorage.getItem(key) || ''
    const decrypted = CryptoJS.AES.decrypt(encrypted, passPhrase).toString(CryptoJS.enc.Utf8)
    
    return decrypted
  }
}

export default HashGenerator
