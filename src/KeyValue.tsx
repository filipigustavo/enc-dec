import { useReducer } from 'react'

type TProps = {
  onSave: (key: string, value: string) => void
}

type TForm = {
  key: string,
  value: string
}

interface TAction extends TForm {
  type: string
}

const reducer = (state: TForm, { type, key, value }: TAction) => {
  switch(type) {
    case 'change':
      return { ...state, [key]: value }
    default:
      return state
  }
}

const initialState: TForm = { key: '', value: '' }

const KeyValue = ({ onSave }: TProps) => {
  const [form, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSave(form.key, form.value)
    const newEvent = new CustomEvent("update-localstorage")
    globalThis.dispatchEvent(newEvent)
  }

  const handleChange = (event: any) => {
    dispatch({ type: 'change', key: event.target.name, value: event.target.value })
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form className='row' onSubmit={handleSubmit}>
          <div className='col-12 mb-3'>
            <h4>Save data on localStorage</h4>
          </div>

          <div className='col-12 mb-3'>
            <label className='form-label'>Key</label>
            <input required placeholder='Ex.: local-key' className='form-control' name='key' value={form.key} onChange={handleChange} />
          </div>

          <div className='col-12 mb-3'>
            <label className='form-label'>Value</label>
            <input required placeholder='Ex.: any value' className='form-control' name='value' value={form.value} onChange={handleChange} />
          </div>

          <div className='col-12'>
            <button className='btn btn-primary' type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default KeyValue
