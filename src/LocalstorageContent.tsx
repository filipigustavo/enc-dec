import { useEffect, useState } from "react"

const getLocalData = () => {
  const local = {...globalThis.localStorage}

  Object.keys(local).filter(item => !!item).forEach(item => {
    const regex = new RegExp(/security|getItem|setItem|clear|removeItem/gi)

    if (regex.test(item)) delete local[item]
  })

  return JSON.stringify(local, null, 2)
}

const LocalstorageContent = () => {
  const EV = "update-localstorage"
  const [local, setLocal] = useState(getLocalData)

  useEffect(() => {
    const handleChangeLocalstorage = () => setLocal(getLocalData)

    globalThis.addEventListener(EV, handleChangeLocalstorage)

    return () => {
      globalThis.removeEventListener(EV, handleChangeLocalstorage)
    }
  }, [])

  return <div className="card">
    <div className="card-body">
      <h5 className="card-title">Conteúdo do localStorage</h5>
      <pre>{local}</pre>
    </div>
  </div>
}

export default LocalstorageContent