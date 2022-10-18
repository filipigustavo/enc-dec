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
  }

  const handleChange = (event: any) => {
    dispatch({ type: 'change', key: event.target.name, value: event.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Salvar: {form.key} / {form.value}</h1>
      <h3>Form: {JSON.stringify(form)}</h3>

      <fieldset>
        <label>Key</label>
        <input name='key' value={form.key} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label>Value</label>
        <input name='value' value={form.value} onChange={handleChange} />
      </fieldset>

      <button type="submit">Salvar</button>
    </form>
  )
}

export default KeyValue
