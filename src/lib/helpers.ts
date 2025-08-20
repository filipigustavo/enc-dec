import { TGetKey } from "./types"

const getKey: TGetKey = ({ globalPrefix, prefix, key }) => `${globalPrefix}_${prefix}_${key}`

const testKey = (key: string): boolean => {
  const RESERVED_KEYS: string[] = ["security", "index"]
  const reservedKeyRegex = new RegExp(`${RESERVED_KEYS.join("|")}`, 'gi')
  const hasReservedKey = reservedKeyRegex.test(key)

  if (!!hasReservedKey) throw new Error("NOT_ALLOWED_KEY")

  return hasReservedKey
}

export { getKey, testKey }