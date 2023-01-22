abstract class AbstractGenerator {
    abstract generateHashParts: TGenerateHashParts
    abstract handleHash: THandleHash
    abstract handleEncrypt: THandleEncrypt
    abstract handleDecrypt: THandleDecrypt
}

export default AbstractGenerator