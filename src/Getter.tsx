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
            <h4>Get data from localStorage</h4>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Key (same one used to save data)</label>
            <input required placeholder='Ex.: local-key' className="form-control" onChange={(event) => setKey(event.target.value)} />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">Get</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Getter
