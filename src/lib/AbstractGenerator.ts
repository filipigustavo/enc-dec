import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

abstract class AbstractGenerator<H> {
  constructor(public security: string) {}

  persistData = (hashs: THashKeys) => {
    localStorage.setItem(this.security, JSON.stringify(hashs))
  }

  abstract generateHashParts: TGenerateHashParts<H>
  abstract handleHash: THandleHash<H>

  handleEncrypt: THandleEncrypt = (key, value, passPhrase) => {
    const encrypted = AES.encrypt(value, passPhrase).toString()

    localStorage.setItem(key, encrypted)
  }

  handleDecrypt: THandleDecrypt = (key, passPhrase) => {
    const encrypted = localStorage.getItem(key) || ''
    const decrypted = AES.decrypt(encrypted, passPhrase).toString(Utf8)

    return decrypted
  }
}

export default AbstractGenerator
