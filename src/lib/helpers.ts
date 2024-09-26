const getKey: TGetKey = ({ globalPrefix, prefix, key }) => `${globalPrefix}_${prefix}_${key}`

export { getKey }