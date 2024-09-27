import { useEffect, useState } from "react"

const getIndexData = (index: string) => (): string[] => {
  const rawIndexData = globalThis.localStorage.getItem(index)

  if (!rawIndexData) return []

  const parsedIndexData = JSON.parse(rawIndexData)

  return parsedIndexData

}

type TProps = {
  index: string
  onRemove: Function
}

const RemoveItem = ({ index, onRemove }: TProps) => {
  const EV = "update-localstorage"
  const [indexData, setIndexData] = useState(getIndexData(index))

  const handleRemove = (key: string) => () => {
    onRemove(key)
    const updateEvent = new CustomEvent(EV)
    globalThis.dispatchEvent(updateEvent)
  }

  useEffect(() => {
    const handleChangeLocalstorage = () => setIndexData(getIndexData(index))

    globalThis.addEventListener(EV, handleChangeLocalstorage)

    return () => {
      globalThis.removeEventListener(EV, handleChangeLocalstorage)
    }
  }, [])

  return <div className="card mb-3">
    <div className="card-body">
      <div className="row">
        <div className="col-12">
        <h4>Remove data from localStorage</h4>
          {!indexData.length ? <p>Save some keys</p> : indexData.map((item, index) => (
            <button key={index} type="button" className="btn btn-danger me-1" onClick={handleRemove(item)}>{item}</button>
          ))}
        </div>
      </div>
    </div>
  </div>
}

export default RemoveItem