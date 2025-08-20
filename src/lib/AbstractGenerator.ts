import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import { TGenerateHashParts, THandleDecrypt, THandleEncrypt, THandleHash, THandleRemove, THandleRemoveKeyFromIndex, THandleSaveKeyIntoIndex, THashKeys } from './types'

abstract class AbstractGenerator<H> {
  constructor(public security: string) {}

  persistData = (hashs: THashKeys) => {
    globalThis.localStorage.setItem(this.security, JSON.stringify(hashs))
  }

  abstract generateHashParts: TGenerateHashParts<H>
  abstract handleHash: THandleHash<H>

  handleEncrypt: THandleEncrypt = (key, value, passPhrase) => {
    const encrypted = AES.encrypt(value, passPhrase).toString()

    globalThis.localStorage.setItem(key, encrypted)
  }

  handleDecrypt: THandleDecrypt = (key, passPhrase) => {
    const encrypted = globalThis.localStorage.getItem(key) || ''
    const decrypted = AES.decrypt(encrypted, passPhrase).toString(Utf8)

    return decrypted
  }

  handleRemove: THandleRemove = (key) => {
    globalThis.localStorage.removeItem(key)
  }

  handleSaveKeyIntoIndex: THandleSaveKeyIntoIndex = (index, key) => {
    const currentIndex: string = globalThis.localStorage.getItem(index) || ""

    if (!currentIndex) {
      globalThis.localStorage.setItem(index, JSON.stringify([key]))
      return
    }

    const parsedIndex: string[] = JSON.parse(currentIndex)
    const hasKeyIntoIndex = parsedIndex.includes(key)

    if (!hasKeyIntoIndex) {
      globalThis.localStorage.setItem(index, JSON.stringify([...parsedIndex, key]))
    }
  }

  handleRemoveKeyFromIndex: THandleRemoveKeyFromIndex = (index, key) => {
    const currentIndex: string = globalThis.localStorage.getItem(index) || ""

    if (!currentIndex) return

    const parsedIndex: string[] = JSON.parse(currentIndex)
    const hasKeyIntoIndex = parsedIndex.includes(key)

    if (!!hasKeyIntoIndex) {
      const newIndex = parsedIndex.filter(item => item !== key)
      globalThis.localStorage.setItem(index, JSON.stringify(newIndex))
    }
  }
}

export default AbstractGenerator
