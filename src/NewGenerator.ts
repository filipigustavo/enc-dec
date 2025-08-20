import { TGenerateHashParts, THandleHash } from './lib'
import AbstractGenerator from './lib/AbstractGenerator'

class NewGenerator extends AbstractGenerator<string[]> {
  generateHashParts: TGenerateHashParts<string[]> = () => {
    const randomNum = () => `${Math.floor(Math.random() * 10)}`

    return [randomNum(), randomNum(), randomNum()]
  }

  handleHash: THandleHash<string[]> = (localhashs: string[]) => {
    const key: string = localhashs.sort().join('')

    return key
  }
}

export default NewGenerator
