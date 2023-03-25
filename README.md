# Enc-Dec

## Usage

Enc-Dec is a simple library to hide values in localStorage easily.

You can have one or more instances in your application using namespaces to security hash.

```js
import { useState } from 'react'
import { useHash } from '@filipigustavo/enc-dec'

// a simple component to interact with enc/dec methods
function Values({ enc, dec }) {
  const [raw, setRaw] = useState('')
  const [value, setValue] = useState('value')
  
  const handleEnc = () => enc('local-storage-key', raw)

  const handleDec = () => {
    const val = dec('local-storage-key')
    setValue(val)
  }

  return (
    <div>
      <input value={raw} onChange={(ev) => setRaw(ev.target.value)} />
      <button onClick={handleEnc}>Enc</button>
      <button onClick={handleDec}>Dec</button>
      <br />
      Value: {value}
    </div>
  )
}

function App() {
  // here you have the default hash
  const { enc, dec } = useHash()
  // here you have a namespaced hash
  const { enc: enc2, dec: dec2 } = useHash('other-namespace')

  return (
    <div>
      <h1>Default</h1>
      <Values enc={enc} dec={dec} />

      <hr />

      <h1>Other namespace</h1>
      <Values enc={enc2} dec={dec2} />
    </div>
  )
}

export default App
```
