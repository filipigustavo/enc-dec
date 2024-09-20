import { useState } from "react"

type TProps = {
  onGet: (key: string) => void
}

const Getter = ({ onGet }: TProps) => {
  const [key, setKey] = useState<string>('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const value = onGet(key)
    globalThis.alert(`Decrypted: ${value}`)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-12 mb-3">
            <h4>Recuperar dados do localStorage</h4>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Chave (a mesma utilizada para salvar o dado)</label>
            <input required placeholder='Ex.: chave-local' className="form-control" onChange={(event) => setKey(event.target.value)} />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">Recuperar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Getter
