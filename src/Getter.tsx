import { useState } from "react"

type TProps = {
  onGet: (key: string) => void
}

const Getter = ({ onGet }: TProps) => {
  const [key, setKey] = useState<string>('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const value = onGet(key)
    console.log(`Decrypted: ${value}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Resgatar: {key}</h1>

      <fieldset>
        <label>Key</label>
        <input onChange={(event) => setKey(event.target.value)} />
      </fieldset>

      <button type="submit">Resgatar</button>
    </form>
  )
}

export default Getter
