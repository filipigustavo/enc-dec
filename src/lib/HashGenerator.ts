import { v4 as uuidv4 } from 'uuid'
import MD5 from 'crypto-js/md5'
import { LoremIpsum } from 'lorem-ipsum'

import AbstractGenerator from './AbstractGenerator'
import { TGenerateHashParts, THandleHash, THashKeys } from './types'

const lorem = new LoremIpsum()

class HashGenerator extends AbstractGenerator<THashKeys> {
  generateHashParts: TGenerateHashParts<THashKeys> = () => {
    const keys: string[] = lorem.generateWords(5).split(' ')
    const initialHash: string = uuidv4()
    const hashs: THashKeys = {}
    
    initialHash
      .split('-')
      .forEach((item: string, index: number) => {
        hashs[keys[index]] = MD5(item).toString()
      })

    return hashs
  }

  handleHash: THandleHash<THashKeys> = (localhashs: THashKeys) => {
    const keys: string[] = Object.keys(localhashs)
    const values: string[] = keys.map((item) => localhashs[item])
    const sortedValues: string[] = values.sort()
    const key: string = sortedValues.join('')

    return key
  }
}

export default HashGenerator
